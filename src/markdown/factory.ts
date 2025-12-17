import { type Note } from "@/keep/parser";
import { MarkdownDocument } from "./document";

function leftWords(s: string) {
  return s.slice(0, 75);
}

export function createDocumentFrom(note: Note): MarkdownDocument {
  const title =
    note.title ??
    (note.lines.length > 0 ? leftWords(note.lines[0]) : "Blank Document");

  const doc = new MarkdownDocument("<<");
  doc.appendHeading(title);
  doc.appendParagraph(note.lines);

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
