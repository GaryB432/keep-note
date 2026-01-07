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

export function findBanner(document: Element): Element | null {
  const banner = document.querySelector('[role="banner"]');
  return banner;
}

export function findHomeAnchor(banner: Element): Element | null {
  // const anchor = banner.querySelectorAll("div > a + div");
  // const anchors = banner.querySelectorAll('a[href="#"]');
  // const anchors = banner.querySelectorAll('div:has(a[href="#"])');
  // const anchors = banner.querySelectorAll('div + div');
  // const anchors = banner.querySelectorAll('div:nth-child(2)');
  // const anchors = banner.querySelectorAll(
  //   "div:has(> div:nth-child(5)):has(> div:last-child):not(:has(> :not(div)))",
  // );
  // for (const a of anchors) {
  //   console.log(stringify(a.outerHTML.slice(0, 6000)));
  //   // if (a.className === "") {
  //   //   return a;
  //   // }
  // }

  if (banner.childElementCount !== 3) throw new Error("not 3");
  // const the_one_with_the_thing = banner.children.item(1);
  const leftPart = banner.children.item(1)?.firstElementChild;
  if (leftPart?.childElementCount !== 5) throw new Error("not 5");
  const div_with_div_with_image = leftPart.children.item(3);
  console.log(div_with_div_with_image?.outerHTML);

  let ha: Element | null = div_with_div_with_image?.children.item(1) ?? null;

  if (!ha) {
    console.log('inserting anchor')
    ha = document.createElement("div");
    ha.textContent = "@";
    div_with_div_with_image?.append(ha);
  }

  // if (div_with_div_with_image?.childElementCount === 1){
  //   // only the div button is here.
  //   ha = document.createElement("div")
  //   div_with_div_with_image.append(ha);
  // }

  return ha;
}
