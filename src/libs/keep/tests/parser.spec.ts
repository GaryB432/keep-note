import { readFileSync } from "fs";
import jsdom from "jsdom";
import { beforeEach, describe, expect, it } from "vitest";
import { type Note, findNotes } from "../../../keep/parser";
import { join } from "path";

const { JSDOM } = jsdom;

const readFixtureHtml = (f: string) =>
  readFileSync(
    join(import.meta.dirname, "fixtures", f.concat(".html")),
    "utf-8",
  );

const gramma = readFixtureHtml("gramma");

const box_of_3 = readFixtureHtml("three-contexts");

describe("basics", () => {
  it("finds 3", () => {
    const dom = new JSDOM(``);
    const w = dom.window;
    const doc = w.document;

    const container_of_box = doc.createElement("div");
    container_of_box.innerHTML = box_of_3;
    doc.body.appendChild(container_of_box);

    const notes = findNotes(container_of_box);
    expect(notes.length).toEqual(3);
  });
});

describe("Parsing XL", () => {
  const haystack = gramma;
  const w = new JSDOM(``).window;
  const d = w.document.createElement("div");
  d.innerHTML = haystack;
  w.document.body.appendChild(d);

  let notes: Note[];

  beforeEach(() => {
    notes = findNotes(w.document.body);
  });

  it("lots is the right amount (so brittle)", () => {
    expect(d.outerHTML).toMatch(/Animal Hospital/);
  });

  it("finds lots of notes", () => {
    expect(notes.length).toEqual(25);
  });
});

describe("Parsing S", () => {
  it("finds single note", () => {
    const j = new JSDOM(
      `<!DOCTYPE html><html><head></head><body></body></html>`,
    );
    const w = j.window;

    const a = w.document.createElement("section");
    const b = w.document.createElement("section");
    const c = w.document.createElement("aside");
    const d = w.document.createElement("section");

    c.appendChild(d);
    b.appendChild(c);
    a.appendChild(b);

    d.outerHTML = simple;
    w.document.body.appendChild(a);

    expect(w.document.textContent).toBeDefined();
    const notes = findNotes(a);
    expect(notes.length).toEqual(1);
    const [onlyNote] = notes;
    expect(onlyNote?.context.className).toEqual("context");
  });
});

const simple = `<section><div role="button" data-tooltip-text="Select note"></div>

<div class="context">
   <div >
      <div role="button" data-tooltip-text="Pin note" aria-label="Pin note" />
      <div>
         <div />
      </div>
      <div class="txetnoc">
         <div contenteditable="false" aria-multiline="true" role="textbox">here it is</div>
         <div />
      </div>
      <div class="a-presentation-container">
         <div class="IZ65Hb-vIzZGf-bVEB4e-qJTHM">
            <p role="presentation">
               <span style="font-family: "Google Sans Text"; font-size: 11pt">extensions ftx\ninter alia</span>
            </p>
         </div>
      </div>
      <div class="remove-source-gb">
         <div style="display: none">
            <div role="button" style="user-select: none">
               <div class="XPtOyb-Bz112c" />
               <label class="XPtOyb-fmcmS" />
            </div>
         </div>
         <div role="button" class="not-context-d" data-tooltip-text="Remove source" />
      </div>
      <div class="reminder" style="display: none">
         <div role="button" style="user-select: none">
            <div />
            <label />
         </div>
      </div>
      <div role="button" class="not-context-d" data-tooltip-text="Delete reminder" />
   </div>
   <div class="edited-gb" data-tooltip-text="Created Nov 20" aria-label="Created Nov 20">Edited Nov 20</div>
</div>

</section>`;
