import { stringify } from "@/shared/strings";

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
  context: Element; //  the div that was `selected` by a `Select note` button. It contains many children
  title?: string | undefined;
  lines: string[];
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
  const lines: string[] = [];
  const anchors: Anchor[] = [];
  const images: Image[] = [];

  // console.log(context.innerHTML);
  // const dfd = context.querySelectorAll("*");
  // dfd.forEach((el) => {
  //   if (el.childElementCount === 0) {
  //     console.log("top level", el.tagName, el.role, el.className);
  //   } else {
  //     console.log(
  //       el.tagName,
  //       el.className,
  //       el.childElementCount,
  //       stringify(el.textContent)
  //     );
  //   }
  // });

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

  context.querySelectorAll("P[role='presentation']").forEach((p) => {
    lines.push(stringify(p) ?? "🤷🏻‍♂️");
    // p.style.border = '1px solid buckwheat'
  });

  const body = "see markdown!";
  return { anchors, images, body, title, context, lines };
}
