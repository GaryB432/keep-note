import assert from "node:assert/strict";
import { describe, test } from "node:test";

import { leftWords, timestampForDir } from "./strings.ts";

describe("Strings", () => {
  test("leftWords returns leftmost words up to maxLength", () => {
    const tb = "The quick brown fox jumps";
    assert.equal(leftWords(tb, 1), "");
    assert.equal(leftWords(tb, 3), "The");
    assert.equal(leftWords(tb, 5), "The");
    assert.equal(leftWords(tb, 10), "The quick");
    assert.equal(leftWords(tb, 18), "The quick brown");
    assert.equal(leftWords(tb, 22), "The quick brown fox");
    assert.equal(leftWords(tb, tb.length), tb);
    assert.notEqual(leftWords(tb, tb.length - 1), tb);
  });
});

test("timestampForDir formats a timestamp", () => {
  assert.equal(
    timestampForDir(new Date(2059, 4, 20, 16, 11, 42)),
    "2059-05-20_16-11-42",
  );
});
