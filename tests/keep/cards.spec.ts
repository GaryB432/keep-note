import jsdom from "jsdom";
import { readFileSync } from "node:fs";
import { join } from "node:path";
import { expect, test } from "vitest";
import { toNote } from "../../src/keep/parser";

const { JSDOM } = jsdom;

const cards = [
  "alpha-bravo",
  "descale",
  "gates",
  "leveraging_chaos",
  "media-checklist",
  "shared",
  "simple-list",
  "simple",
  "sticking-points",
];

cards.forEach((cardName) => {
  // describe("card specimens ".concat(cardName), () => {
  const g = readFileSync(
    join(
      import.meta.dirname,
      "..",
      "fixtures",
      "cards",
      cardName.concat(".html"),
    ),
    "utf-8",
  );
  test(cardName, () => {
    const dom = new JSDOM();
    dom.window.document.body.insertAdjacentHTML("afterend", g);
    const note = toNote(dom.window.document.querySelector("div:nth-child(1)")!);
    delete note.context;
    expect(note).toMatchSnapshot();
  });
  // });
});
