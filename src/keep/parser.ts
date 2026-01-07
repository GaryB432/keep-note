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

/**
 * The HomeAnchor is the section of the top-of-page banner that contains
 * a div with a brand image and link to Keep, inter alia.
 *
 * ```html
 * <div style="display: flex; align-items: center">  <-- div is flex so
 *   <div>                                               adding subtle branding to the end
 *     <a href="#">                                      would work
 *       <img src="google keep logo">
 *       <span>Keep</span>
 *     </a>
 *   </div>
 * </div>
 * ```
 *
 * @param banner
 * @returns
 */
export function findHomeAnchor(banner: Element): Element | null {
  // TODO try again with the querySelector
  // const anchors = banner.querySelectorAll("div > a + div");
  // const anchors = banner.querySelectorAll('a[href="#"]');
  // const anchors = banner.querySelectorAll('div:has(a[href="#"])');
  // const anchors = banner.querySelectorAll('div + div');
  // const anchors = banner.querySelectorAll('div:nth-child(2)');

  if (banner.childElementCount !== 3) {
    // 0 a home anchor seemingly for a11y
    // 1 the homeAnchor inter alia, eg main manu, restore
    // 2 hidden elements, iframes
    throw new Error(
      `The element in this position is expected to have 3 child but has ${banner.childElementCount} `,
    );
  }
  const second_child_of_banner = banner.children.item(1);
  const five_child_div = second_child_of_banner?.firstElementChild;

  if (five_child_div?.childElementCount !== 5) {
    // 0 aria-label="Main nemu" M3 18h18v-2H3v2zm0-5h18v-2H3v2zm0-7v2h18V6H3z
    // 1 Go back M20 11H7.83l5.59-5.59L12 4l-8 8 8 8 1.41-1.41L7.83 13H20v-2z
    // 2 M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z
    // 3 homeAnchor <-- is chilren.item(3)
    // 4 role=heading
    throw new Error(
      `The element in this position is expected to have 5 children but has ${five_child_div?.childElementCount} `,
    );
  }

  const homeAnchor = five_child_div.children.item(3);

  if (!homeAnchor) return null;

  const home_href = homeAnchor.querySelector("a");
  const href_of_home_likely_hashtag = home_href?.getAttribute("href");

  if (href_of_home_likely_hashtag !== "#") throw new Error("no home link");

  if (homeAnchor.childElementCount !== 1) throw new Error("unexpected layout");

  return homeAnchor;
}
