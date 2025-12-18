import { type Note } from "@/keep/parser";
import { MarkdownDocument, MarkdownDocumentOptions } from "./document";

function leftWords(s: string) {
  return s.slice(0, 75);
}

export function createDocumentFrom(
  note: Note,
  opts: MarkdownDocumentOptions = { separator: "" },
): MarkdownDocument {
  const title =
    note.title ??
    (note.blocks.length > 0 ? leftWords(note.blocks[0]) : "Blank Document");

  const doc = new MarkdownDocument(opts);
  doc.appendHeading(title);
  doc.appendParagraph(note.blocks);

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
