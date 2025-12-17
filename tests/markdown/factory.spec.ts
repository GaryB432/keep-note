import { describe, it, expect } from "vitest";
import { createDocumentFrom } from "../../src/markdown/factory";
import { type Note } from "../../src/keep/parser";
import { JSDOM } from "jsdom";

describe("factory basics", () => {
  it("handles blank document", () => {
    const dom = new JSDOM(``);
    const w = dom.window;
    const doc = w.document;

    const n: Note = {
      body: "see markdown!",
      context: doc.createElement("div"),
      lines: [],
      anchors: [],
      images: [],
    };
    const sut = createDocumentFrom(n);
    expect(sut.lines.join('\n')).toMatchInlineSnapshot(`
      "# Blank Document
      <<
      <<
         - coming
         - soon"
    `);

  });
});
