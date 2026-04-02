import { describe, expect, test } from "vitest";

import { leftWords, spaces, stringify } from "./strings";

describe("Strings", () => {
  test("stringify returns cleaned string", () => {
    expect(stringify("  hello   world\nnew line  ")).toEqual(
      "hello world new line",
    );
  });
  test("stringify returns undefined for empty or falsy", () => {
    expect(stringify("")).toBeUndefined();
    expect(stringify(undefined)).toBeUndefined();
    expect(stringify(null)).toBeUndefined();
    expect(stringify("   ")).toBeUndefined();
  });

  test("spaces returns correct number of spaces", () => {
    expect(spaces(3)).toEqual("   ");
    expect(spaces(0)).toEqual("");
  });

  test("leftWords returns leftmost words up to maxLength", () => {
    expect(leftWords("The quick brown fox jumps", 10)).toMatch(/^The /);
    expect(leftWords("The quick brown fox jumps", 100)).toContain("quick");
  });
});
