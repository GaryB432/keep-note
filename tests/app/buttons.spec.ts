import jsdom from "jsdom";
import { describe, expect, it } from "vitest";
import { ButtonSet } from "../../src/app/buttons";

describe("Buttons stub", () => {
  const { JSDOM } = jsdom;
  const dom = new JSDOM(
    `<!DOCTYPE html><html><body><p>FUN TESTS</p></body></html>`,
  );

  const bs = new ButtonSet({}, 0, () =>
    dom.window.document.createElement("div"),
  );
  it("should exist", () => {
    expect(Object.keys(bs)).toEqual([
      "saveButton",
      "copyButton",
      "archiveButton",
      "toggleButton",
    ]);
  });
});
