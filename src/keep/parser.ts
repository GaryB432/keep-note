import { stringify } from "@/shared/strings";
import { parseCommandLine } from "typescript";

type Image = {
  title?: string | undefined;
  src: string;
};

type Anchor = {
  title?: string | undefined;
  href: string;
};

export type Note = {
  body: "see markdown!";
  // TODO don't need body
  context?: Element; //  the div that was `selected` by a `Select note` button. It contains many children
  title?: string | undefined;
  blocks: string[];
  anchors: Anchor[];
  images: Image[];
};

export function findNotes(content: HTMLElement): Note[] {
  const select_note_buttons = content.querySelectorAll<Element>(
    'div[data-tooltip-text="Select note"]',
    // '*:has(> * > [data-tooltip-text="Select note"])'
  );

  if (select_note_buttons.length === 0) {
    // console.log(`cannot find notes in "${content.outerHTML.slice(0, 400)}..."`);
    console.log("✅ thanks for playing");
    return [];
  }
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

  select_button_parents.forEach((p) => (p.style.outline = "3px solid blue"));

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
  const paragraphs_not_lines_need_separation: string[] = [];
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
    .forEach((presentation_paragraph) => {
      // const st = stringify(presentation_paragraph);
      // const m = st ?? "🤷🏻‍♂️";

      presentation_paragraph.children;
      for (const p_child of presentation_paragraph.children) {
        switch (p_child.tagName) {
          case "SPAN": {
            const plan_rwa_text = p_child.textContent;
            const read_texts = stringify(plan_rwa_text);
            const clean_span_text = read_texts!;
            paragraphs_not_lines_need_separation.push(clean_span_text);
            return;
          }
          case "A": {
            paragraphs_not_lines_need_separation.push(
              p_child.outerHTML.slice(0, 100),
            );
            // console.log("hmmmm", p_child.outerHTML);
            break;
          }
          default: {
            throw new Error("fall thru #f9dk4j");
          }
        }

        // console.log(p_child.tagName); // Access properties of the child element
        // Do stuff with child element
      }

      // lines.push(stringify(p) ?? "🤷🏻‍♂️");
      // p.style.border = '1px solid buckwheat'
    });

  const body = "see markdown!";
  return {
    anchors,
    images,
    body,
    title,
    context,
    blocks: paragraphs_not_lines_need_separation,
  };
}
