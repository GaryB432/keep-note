import { describe, expect, it } from "vitest";
import { type Note } from "../../src/keep/parser";
import { createDocumentFrom } from "../../src/markdown/factory";
import { MarkdownDocumentOptions } from "../../src/markdown/document";

const opts: MarkdownDocumentOptions = {
  separator: "<<",
};

describe("factory basics", () => {
  const cheer = ["for he is a jolly good fellow", "which nobody can deny"];

  it("handles blank document", () => {
    const n: Note = {
      body: "see markdown!",
      anchors: [],
      images: [],
      blocks: [],
    };
    const sut = createDocumentFrom(n, opts);
    expect(sut.lines.join("\n")).toMatchInlineSnapshot(`"# Blank Document"`);
  });

  it("handles S", () => {
    const sut = createDocumentFrom(
      {
        body: "see markdown!",
        blocks: [...cheer],
        anchors: [],
        title: "lower case but o well",
        images: [],
      },
      opts,
    );
    expect(sut.lines).toEqual([
      "# lower case but o well",
      "<<",
      "for he is a jolly good fellow",
      "<<",
      "which nobody can deny",
    ]);
    // expect(sut.lines.join("\n")).toMatchInlineSnapshot(`
    //   "# lower case but o well
    //   <<
    //   for he is a jolly good fellow
    //   <<
    //   which nobody can deny"
    // `);
  });

  it("handles M", () => {
    const sut = createDocumentFrom(
      {
        body: "see markdown!",
        blocks: [...cheer, "  starting at 3"],
        anchors: [
          { href: "https://boring.example.com" },
          { href: "https://fun.example.com", title: "fun page" },
        ],
        title: "Meium-sized documents are examined",
        images: [],
      },
      opts,
    );
    expect(sut.lines).toEqual([
      "# Meium-sized documents are examined",
      "<<",
      "for he is a jolly good fellow",
      "<<",
      "which nobody can deny",
      "<<",
      "  starting at 3",
      "<<",
      "   - [https://boring.example.com](https://boring.example.com)",
      "   - [fun page](https://fun.example.com)",
    ]);
  });
});
