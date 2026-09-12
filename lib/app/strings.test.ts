import assert from "node:assert";
import { describe, test } from "node:test";

import { hyphenate_date, leftWords, timestampForDir } from "./strings.ts";

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

const one_very_special_centennial = new Date(2059, 4, 20, 16, 11, 42);
test("timestampForDir formats a timestamp", () => {
  assert.strictEqual(
    timestampForDir(one_very_special_centennial),
    "2059-05-20_16-11-42",
  );
});

test("hyphenate_date hyphenates a date", () => {
  assert.strictEqual(
    hyphenate_date(one_very_special_centennial),
    "May 20 2059",
  );
});
