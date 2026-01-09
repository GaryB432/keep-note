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
        src: `image src: ${n.toFixed(5)}`,
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
          href: `https://${n}`,
          title: `click for anchor ${n}`,
        })),
        title: "lower case but o well",
        images: [6, 8].map((n) => ({
          src: `imgur/wg/${n}`,
          title: `an image ${n} title`,
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
      "   - an image 6 title _imgur/wg/6_",
      "   - an image 8 title _imgur/wg/8_",
      "<<",
      "   - [click for anchor 6](https://6)",
      "   - [click for anchor 8](https://8)",
    ]);
  });

  it("handles M", () => {
    const sut = createDocumentFrom(
      {
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
      "   - [boring.example.com](https://boring.example.com)",
      "   - [fun page](https://fun.example.com)",
    ]);
  });
});
