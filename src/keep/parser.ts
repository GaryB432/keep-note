import { spaces, stringify } from "@/shared/strings";
import type { Anchor, Image, Note } from "./types";

export function findArchiveButton(toolbar: Element): Element | null {
  return toolbar.querySelector('[aria-label="Archive"]');
}
export function findToolbar(context: Element): Element | null {
  return context.querySelector('[role="toolbar"]');
}

export function findNotes(content: HTMLElement): Note[] {
  const select_note_buttons = content.querySelectorAll<Element>(
    'div[data-tooltip-text="Select note"]',
  );

  const select_button_parents = Array.from<Element>(select_note_buttons)
    .map((e) => e.parentElement!)
    .filter(
      (buttonParent) => buttonParent && hasPresnetationElements(buttonParent),
    );

  const notes = select_button_parents.map<Note>((select_button_parent) => {
    const secundo =
      select_button_parent.querySelector<HTMLElement>("div:nth-child(2)");
    if (!secundo) {
      throw new Error(
        "these are expected to have a select button and then a note-div",
      );
    }
    return toNote(secundo);
  });

  // select_button_parents.forEach((p) => (p.style.outline = "3px solid blue"));

  return notes;
}

export function hasPresnetationElements(parent: ParentNode): boolean {
  // if (element.childElementCount === 0) {
  //   console.error("no elements");

  //   return false;
  // }

  const presentations = parent.querySelectorAll('[role="presentation"]');
  return presentations.length > 0;
}

export function toNote(context: Element): Note {
  // if (!context) {
  //   throw new Error("error dfo87ad;");
  // }
  let title: string | undefined;
  const blocks: string[] = [];
  const anchors: Anchor[] = [];
  const images: Image[] = [];

  context.querySelectorAll("DIV[role='textbox']").forEach((d, i) => {
    if (i > 0) {
      throw new Error("too many textboxes ftm");
    }
    title = title ?? stringify(d);
  });

  context.querySelectorAll("A").forEach((a) => {
    const href = a.getAttribute("href");
    const title = a.textContent ?? "NO TEXT CONTENT???";
    if (href) {
      anchors.push({ href, title });
    }
  });

  context.querySelectorAll("IMG").forEach((img) => {
    const src = img.getAttribute("src");
    if (src) {
      images.push({ src });
    }
  });

  context
    .querySelectorAll("P[role='presentation']")
    .forEach((presentation_paragraph_of_spans) => {
      const { textContent } = presentation_paragraph_of_spans;
      if (textContent) {
        const kids = presentation_paragraph_of_spans.childElementCount;
        console.assert(kids > 0);
        const text = stringify(textContent)!;
        blocks.push(indent((kids - 1) * 2, text));
      }
    });

  return {
    anchors,
    images,
    title,
    context,
    blocks,
  };
}
function indent(count: number, text: string): string {
  return spaces(count).concat(text);
}
