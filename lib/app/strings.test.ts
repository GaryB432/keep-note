import assert from "node:assert";
import { describe, test } from "node:test";

import { leftWords, spaces, stringify } from "./strings.ts";

describe("Strings", () => {
  test("stringify returns cleaned string", () => {
    assert.deepEqual(
      stringify("  hello   world\nnew line  "),
      "hello world new line",
    );
  });
  test("stringify returns undefined for empty or falsy", () => {
    assert.deepEqual(stringify(""), undefined);
    assert.deepEqual(stringify(undefined), undefined);
    assert.deepEqual(stringify(null), undefined);
    assert.deepEqual(stringify("   "), undefined);
  });

  test("spaces returns correct number of spaces", () => {
    assert.deepEqual(spaces(3), "   ");
    assert.deepEqual(spaces(0), "");
  });

  test("leftWords returns leftmost words up to maxLength", () => {
    assert.match(leftWords("The quick brown fox jumps", 10), /^The /);
    assert.ok(leftWords("The quick brown fox jumps", 100).includes("quick"));
  });
});
