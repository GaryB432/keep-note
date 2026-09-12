import { log as frog, note as missive, text } from "@clack/prompts";
import { cyan, greenBright } from "ansis";
import { join, parse } from "node:path";

import type { Attachment, Note } from "../keep/types.ts";

import { MarkdownDocument } from "../markdown/document.ts";
import { enquote, leftWords, titleizeDate } from "./strings.ts";

type Renamer = {
  input: string;
  output: string;
};

export async function createSingleDocument(
  notes: Partial<Note>[],
  path: string,
  outDir: string,
  interactive: boolean,
): Promise<MarkdownDocument | symbol> {
  const doc = new MarkdownDocument();

  const sorted_notes = notes
    .map((n) => ({
      textContent: n.textContent ?? "**note content**",
      userEditedTimestampUsec: n.userEditedTimestampUsec ?? 0,
      ...n,
    }))
    .toSorted((a, b) => b.userEditedTimestampUsec - a.userEditedTimestampUsec);

  for (let i = 0; i < sorted_notes.length; i++) {
    const note = sorted_notes[i];
    if (i > 0) {
      doc.appendHorizontalRule();
    }

    let { title } = note;
    if (!title || title.length < 1) {
      title = [
        "Untitled",
        titleizeDate(note.userEditedTimestampUsec / 1000),
        i.toString(10),
      ].join(" ");
    }

    doc.appendHeading(leftWords(title, 40), 2);

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
      if (interactive) {
        missive(note.textContent, "Note context");
        frog.message(greenBright("Provide attachment names"));
      }
      // ,

      const flines: Renamer[] = [];
      for (const [i, a] of note.attachments.entries()) {
        const p = parse(a.filePath);
        let newName: Promise<string | symbol>;
        if (interactive) {
          frog.message(cyan(`${i + 1} of ${note.attachments.length}`));
          newName = resolveAttachmentName(outDir, a);
        } else {
          newName = Promise.resolve(join(outDir, p.base));
        }

        const output = await newName;
        if (typeof output === "symbol") {
          return output;
        } else {
          flines.push({ input: join(path, p.base), output });
        }
      }
      if (flines.length > 0) {
        doc.appendHeading("Attachments", 3);
        doc.appendCode(
          flines.map((c) =>
            ["cp", enquote(c.input), enquote(c.output)].join(" "),
          ),
          "bash",
        );
      }
    }
  }

  return doc;
}

export function summarizeListOfNotes(
  notes: Partial<Note>[],
): string | undefined {
  return ["much", "info", "coming", "soon", `notes: ${notes.length}`].join(
    "\n",
  );
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
      if (!v || v.length === 0) {
        return "Attachment must have a name";
      }
    },
  });

  return typeof name === "symbol" ? name : join(outDir, name.concat(parts.ext));
}
