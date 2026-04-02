import type { Attachment, Note } from "#lib/keep/types.d";

import { hyphenate_date } from "#lib/app/strings";
import { MarkdownDocument } from "#lib/markdown/document";
import { isCancel, text } from "@clack/prompts";
import { cyan } from "ansis";
import { join, parse } from "node:path";

type Renamer = {
  input: string;
  output: string | symbol;
};

export async function createSingleDocument(
  notes: Note[],
  path: string,
  outDir: string,
  interactive: boolean,
): Promise<MarkdownDocument> {
  const doc = new MarkdownDocument();

  const sorted_notes = notes.toSorted(
    (a, b) => b.userEditedTimestampUsec - a.userEditedTimestampUsec,
  );

  let cancelled = false;

  for (let i = 0; !cancelled && i < sorted_notes.length; i++) {
    const note = sorted_notes[i];
    if (i > 0) {
      doc.appendHorizontalRule();
    }

    let { title } = note;
    if (!title || title.length < 1) {
      title = [
        "Untitled",
        hyphenate_date(note.userEditedTimestampUsec / 1000).concat(` ${i}`),
      ].join(" ");
    }

    doc.appendHeading(title);

    if (note.textContent && note.textContent !== "") {
      doc.appendParagraph(note.textContent.trimEnd());
    }

    if (note.annotations) {
      if (!note.annotations.every((a) => a.source === "WEBLINK")) {
        throw new Error("unkonwn annotation source");
      }
      doc.appendList(
        note.annotations.map((a) =>
          anchorLine({
            href: a.url,
            title: a.title,
          }),
        ),
        false,
        0,
      );
    }

    if (note.attachments) {
      const flines: Renamer[] = [];
      for (const a of note.attachments) {
        const p = parse(a.filePath);
        const newNamePromise = interactive
          ? resolveAttachmentName(outDir, a)
          : Promise.resolve(join(outDir, p.base));
        const output = await newNamePromise;
        if (isCancel(output)) {
          cancelled = true;
          break;
        } else {
          flines.push({ input: join(path, p.base), output });
        }
      }
      if (flines.length > 0) {
        doc.appendHeading("Attachments", 2);
        doc.appendCode(
          flines.map((c) => ["cp", c.input, c.output].join(" ")),
          "bash",
        );
      }
    }
  }

  return doc;
}

function anchorLine(anchor: {
  href: string;
  title?: string | undefined;
}): string {
  return `[${anchor.title ?? new URL(anchor.href).hostname}](${anchor.href})`;
}

async function resolveAttachmentName(
  outDir: string,
  attachment: Attachment,
): Promise<string | symbol> {
  const parts = parse(attachment.filePath);
  const name = await text({
    initialValue: parts.name,

    message: `Rename ${cyan(attachment.mimetype)}  Attachment`,
    validate: (v) => {
      if (v.length === 0) {
        return "Attachment must have a name";
      }
    },
  });

  return isCancel(name) ? name : join(outDir, name.concat(parts.ext));
}
