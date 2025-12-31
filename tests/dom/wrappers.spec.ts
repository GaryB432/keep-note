import jsdom from "jsdom";
import { describe, expect, it } from "vitest";
import { addClickListener } from "../../src/dom/wrappers";

describe("Buttons stub", () => {
  const { JSDOM } = jsdom;
  const dom = new JSDOM(
    `<!DOCTYPE html><html><body><p>FUN TESTS</p></body></html>`,
  );

  const element = dom.window.document.createElement("div");

  addClickListener(element, () => {});

  it("should exist", () => {
    expect(element.outerHTML).toMatchInlineSnapshot(`"<div></div>"`);
  });
});
