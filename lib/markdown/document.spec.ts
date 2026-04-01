import { beforeEach, describe, expect, test } from "vitest";

import { MarkdownDocument } from "./document";

describe("MarkdownDocument", () => {
  let doc: MarkdownDocument;
  beforeEach(() => {
    doc = new MarkdownDocument({ separator: "" });
  });

  test("appendHeading adds heading", () => {
    doc.appendHeading("Hello", 2);
    expect(doc.lines[0]).toEqual("## Hello");
  });

  test("appendList adds bullet list", () => {
    doc.appendList(["item1", "item2"]);
    expect(doc.lines[0]).toContain("- item1");
    expect(doc.lines[1]).toContain("- item2");
  });

  test("appendList adds numbered list", () => {
    doc.appendList(["item1"], true);
    expect(doc.lines[0]).toContain("1. item1");
  });

  test("appendParagraph adds paragraph", () => {
    doc.appendParagraph("This is a paragraph.");
    expect(doc.lines[0]).toEqual("This is a paragraph.");
  });

  test("lines omits trailing separator", () => {
    doc.appendParagraph("foo");
    expect(doc.lines[doc.lines.length - 1]).toEqual("foo");
  });
});

test("handles non-empty separator correctly", () => {
  const docWithSep = new MarkdownDocument({ separator: "<<" });
  docWithSep.appendParagraph("foo");
  docWithSep.appendParagraph("bar");
  // The lines getter should omit the trailing separator, but keep all content
  expect(docWithSep.lines).toEqual(["foo", "<<", "bar"]);
});
