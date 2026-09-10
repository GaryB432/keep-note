import assert from "node:assert";
import { describe, test } from "node:test";

import { leftWords } from "./strings.ts";

describe("Strings", () => {
  test("leftWords returns leftmost words up to maxLength", () => {
    const tb = "The quick brown fox jumps";
    assert.deepEqual(leftWords(tb, 1), "");
    assert.deepEqual(leftWords(tb, 3), "The");
    assert.deepEqual(leftWords(tb, 5), "The");
    assert.deepEqual(leftWords(tb, 10), "The quick");
    assert.deepEqual(leftWords(tb, 18), "The quick brown");
    assert.deepEqual(leftWords(tb, 22), "The quick brown fox");
    assert.deepEqual(leftWords(tb, tb.length), tb);
    assert.notDeepEqual(leftWords(tb, tb.length - 1), tb);
  });
});
