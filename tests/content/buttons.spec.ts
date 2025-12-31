import jsdom from "jsdom";
import { describe, expect, it } from "vitest";
import { ButtonSet } from "../../src/content/buttons";

describe("Buttons stub", () => {
  const { JSDOM } = jsdom;
  const dom = new JSDOM(
    `<!DOCTYPE html><html><body><p>FUN TESTS</p></body></html>`,
  );

  const saveButton = dom.window.document.createElement("div");
  const copyButton = dom.window.document.createElement("div");
  const archiveButton = dom.window.document.createElement("div");
  const toggleButton = dom.window.document.createElement("div");

  const bs = new ButtonSet(
    {},
    0,
    saveButton,
    copyButton,
    archiveButton,
    toggleButton,
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
