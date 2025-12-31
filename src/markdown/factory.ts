import { type Note } from "@/keep/parser";
import { leftWords, stringify } from "@/shared/strings";
import { MarkdownDocument, MarkdownDocumentOptions } from "./document";

export function createDocumentFrom(
  note: Note,
  opts: MarkdownDocumentOptions = { separator: "" },
  includeTitle?: boolean,
): MarkdownDocument {
  const title =
    note.title ??
    (note.blocks.length > 0 ? leftWords(note.blocks[0]) : "Blank Document");

  const doc = new MarkdownDocument(opts);
  if (includeTitle) {
    doc.appendHeading(title);
  }

  note.blocks.forEach((b) => {
    doc.appendParagraph(b);
  });

  if (note.images.length > 0) {
    doc.appendList(note.images.map((m) => makeImageOk(m)));
  }

  if (note.anchors.length > 0) {
    doc.appendList(note.anchors.map((a) => makeAnchorLineOk(a)));
  }

  return doc;
}

function makeAnchorLineOk(anchor: {
  title?: string | undefined;
  href: string;
}): string {
  return `[${anchor.title ?? anchor.href}](${anchor.href})`;
}

function makeImageOk(img: { title?: string | undefined; src: string }): string {
  return img.title ?? img.src;
}
export function suggestFileNameFor(note: Note): string | undefined {
  const m = note.title ?? note.blocks[0] ?? "Untitled";
  const r = stringify(leftWords(m, 80));
  return r;
}
