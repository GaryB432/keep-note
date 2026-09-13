import assert from "node:assert/strict";
import { beforeEach, describe, test } from "node:test";

import { MarkdownDocument, normalizeMarkdown } from "./document.ts";

describe("MarkdownDocument", () => {
  let doc: MarkdownDocument;
  beforeEach(() => {
    doc = new MarkdownDocument({ separator: "<<" });
  });

  test("appendHeading adds heading", () => {
    doc.appendHeading("Hello", 2);
    assert.equal(doc.lines[0], "## Hello");
  });

  test("appendList adds bullet list", () => {
    doc.appendList(["item1", "item2"]);
    assert.deepEqual(doc.lines, ["   - item1", "   - item2", "<<"]);
  });

  test("appendList adds numbered list", () => {
    doc.appendList(["item1"], true);
    assert.deepEqual(doc.lines, ["   1. item1", "<<"]);
  });

  test("appendParagraph adds paragraph", () => {
    doc.appendParagraph("This is a paragraph.");
    assert.deepEqual(doc.lines, ["This is a paragraph.", "<<"]);
  });

  test("lines absolutely does not omit trailing separator", () => {
    doc.appendParagraph("foo");
    assert.deepEqual(doc.lines, ["foo", "<<"]);
  });
});

test("handles non-empty separator correctly", () => {
  const docWithSep = new MarkdownDocument({ separator: "<<" });
  docWithSep.appendParagraph("foo\nis\nfun");
  docWithSep.appendParagraph("bar");
  assert.deepEqual(docWithSep.lines, ["foo", "is", "fun", "<<", "bar", "<<"]);
});

describe("normalizeMarkdown", () => {
  test("inserts a blank line between different block types", () => {
    assert.deepEqual(
      normalizeMarkdown(["# Heading", "paragraph"], { separator: "<<" }),
      ["# Heading", "<<", "paragraph"],
    );
  });

  test("preserves an existing blank line between blocks", () => {
    assert.deepEqual(
      normalizeMarkdown(["# Heading", "<<", "paragraph"], { separator: "<<" }),
      ["# Heading", "<<", "paragraph"],
    );
  });
});
