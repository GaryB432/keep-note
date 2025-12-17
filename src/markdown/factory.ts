import type { Note } from "@/keep/parser";
import { MarkdownDocument } from "./document";

export const greet = (name: string) => `Hello ${name} from: Factory`;
export function createDocumentFrom(note: Note): MarkdownDocument {
  const d = new MarkdownDocument();
  d.appendHeading(note.title ?? note.lines[0].slice(0, 75));
  d.appendParagraph(note.lines);
  d.appendList(["coming", "soon"]);

  return d;
}
