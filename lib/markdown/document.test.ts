import assert from "node:assert";
import { beforeEach, describe, test } from "node:test";

import { MarkdownDocument, normalizeMarkdown } from "./document.ts";

describe("MarkdownDocument", () => {
  let doc: MarkdownDocument;
  beforeEach(() => {
    doc = new MarkdownDocument({ separator: "" });
  });

  test("appendHeading adds heading", () => {
    doc.appendHeading("Hello", 2);
    assert.strictEqual(doc.lines[0], "## Hello");
  });

  test("appendList adds bullet list", () => {
    doc.appendList(["item1", "item2"]);
    assert.strictEqual(doc.lines[0], "   - item1");
    assert.strictEqual(doc.lines[1], "   - item2");
  });

  test("appendList adds numbered list", () => {
    doc.appendList(["item1"], true);
    assert.strictEqual(doc.lines[0], "   1. item1");
  });

  test("appendParagraph adds paragraph", () => {
    doc.appendParagraph("This is a paragraph.");
    assert.strictEqual(doc.lines[0], "This is a paragraph.");
  });

  test("lines omits trailing separator", () => {
    doc.appendParagraph("foo");
    assert.strictEqual(doc.lines[doc.lines.length - 1], "foo");
  });
});

test("handles non-empty separator correctly", () => {
  const docWithSep = new MarkdownDocument({ separator: "<<" });
  docWithSep.appendParagraph("foo");
  docWithSep.appendParagraph("bar");
  // The lines getter should omit the trailing separator, but keep all content
  assert.deepStrictEqual(docWithSep.lines, ["foo", "<<", "bar"]);
});

describe("normalizeMarkdown", () => {
  test("inserts a blank line between different block types", () => {
    assert.deepStrictEqual(normalizeMarkdown(["# Heading", "paragraph"]), [
      "# Heading",
      "",
      "paragraph",
    ]);
  });

  test("preserves an existing blank line between blocks", () => {
    assert.deepStrictEqual(normalizeMarkdown(["# Heading", "", "paragraph"]), [
      "# Heading",
      "",
      "paragraph",
    ]);
  });
});
