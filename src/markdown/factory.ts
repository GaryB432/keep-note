import { findNotes, type Note } from "@/keep/parser";
import { MarkdownDocument } from "./document";

function leftWords(s: string) {
  return s.slice(0, 75);
}

export function createDocumentFrom(note: Note): MarkdownDocument {
  const title =
    note.title ??
    (note.lines.length > 0 ? leftWords(note.lines[0]) : "Blank Document");

  const d = new MarkdownDocument("<<");
  d.appendHeading(title);
  d.appendParagraph(note.lines);
  d.appendList(["coming", "soon"]);

  return d;
}
