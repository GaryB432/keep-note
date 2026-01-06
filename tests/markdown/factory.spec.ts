import { describe, expect, it } from "vitest";
import { type MarkdownDocumentOptions } from "../../src/markdown/document";
import {
  suggestFileNameFor,
  createDocumentFrom,
} from "../../src/markdown/factory";

const opts: MarkdownDocumentOptions = {
  separator: "<<",
};

describe("factory basics", () => {
  const cheer = ["for he is a jolly good fellow", "which nobody can deny"];

  it("sggests name", () => {
    const sut = suggestFileNameFor({
      blocks: [...cheer],
      anchors: [6, 8].map((n) => ({
        href: `go:${n.toFixed(5)}`,
        title: `click for ${n.toExponential(2)}`,
      })),
      title: "lower case but o well",
      images: [6, 8].map((n) => ({
        src: `go:${n.toFixed(5)}`,
        title: `click to see ${n.toString()}`,
      })),
    });
    expect(sut).toEqual("lower case but o well");
  });

  it("handles blank document", () => {
    const n = {
      anchors: [],
      images: [],
      blocks: [],
    };
    const sut = createDocumentFrom(n, opts, true);
    expect(sut.lines.join("\n")).toMatchInlineSnapshot(`"# Blank Document"`);
  });

  it("handles S", () => {
    const sut = createDocumentFrom(
      {
        blocks: [...cheer],
        anchors: [],
        title: "lower case but o well",
        images: [],
      },
      opts,
      true,
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

  it("handles additional stuff", () => {
    const sut = createDocumentFrom(
      {
        blocks: [...cheer],
        anchors: [6, 8].map((n) => ({
          href: `go:${n.toFixed(5)}`,
          title: `click for ${n.toExponential(2)}`,
        })),
        title: "lower case but o well",
        images: [6, 8].map((n) => ({
          src: `go:${n.toFixed(5)}`,
          title: `click to see ${n.toString()}`,
        })),
      },
      opts,
      true,
    );
    expect(sut.lines).toEqual([
      "# lower case but o well",
      "<<",
      "for he is a jolly good fellow",
      "<<",
      "which nobody can deny",
      "<<",
      "   - click to see 6",
      "   - click to see 8",
      "<<",
      "   - [click for 6.00e+0](go:6.00000)",
      "   - [click for 8.00e+0](go:8.00000)",
    ]);
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
      true,
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
