import { describe, expect, it } from "vitest";
import { type Note } from "../../src/keep/parser";
import { createDocumentFrom } from "../../src/markdown/factory";

describe("factory basics", () => {
  const cheer = ["for he is a jolly good fellow uno", "which nobody can deny"];

  it("handles blank document", () => {
    const n: Note = {
      body: "see markdown!",
      lines: [],
      anchors: [],
      images: [],
    };
    const sut = createDocumentFrom(n);
    expect(sut.lines.join("\n")).toMatchInlineSnapshot(`
      "# Blank Document
      <<"
    `);
  });

  it("handles S", () => {
    const n: Note = {
      body: "see markdown!",
      lines: [...cheer],
      anchors: [],
      title: "lower case but o well",
      images: [],
    };
    const sut = createDocumentFrom(n);
    expect(sut.lines.join("\n")).toMatchInlineSnapshot(`
      "# lower case but o well
      <<
      for he is a jolly good fellow uno
      which nobody can deny"
    `);
  });

  it("handles M", () => {
    const n: Note = {
      body: "see markdown!",
      lines: [...cheer],
      anchors: [
        { href: "https://boring.example.com" },
        { href: "https://fun.example.com", title: "fun page" },
      ],
      title: "Meium-sized documents are examined",
      images: [],
    };
    const sut = createDocumentFrom(n);
    expect(sut.lines.join("\n")).toMatchInlineSnapshot(`
      "# Meium-sized documents are examined
      <<
      for he is a jolly good fellow uno
      which nobody can deny
      <<
         - [https://boring.example.com](https://boring.example.com)
         - [fun page](https://fun.example.com)"
    `);
  });
});
