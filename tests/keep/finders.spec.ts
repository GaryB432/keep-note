import jsdom from "jsdom";
import { describe, expect, it } from "vitest";
import { findArchiveButton } from "../../src/keep/finders";

describe("Finders stub", () => {
  const { JSDOM } = jsdom;
  const dom = new JSDOM(
    `<!DOCTYPE html><html><body><p>FUN TESTS</p></body></html>`,
  );

  const toolbar = dom.window.document.createElement("div");

  it("finds Archive Button", () => {
    expect(findArchiveButton(toolbar)).toBeDefined();
  });
});

