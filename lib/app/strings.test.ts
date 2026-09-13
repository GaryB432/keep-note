import assert from "node:assert";
import { describe, test } from "node:test";

import { leftWords, timestampForDir, titleizeDate } from "./strings.ts";

const one_very_special_centennial = new Date(2059, 4, 20, 16, 11, 42);

describe("Strings", () => {
  test("leftWords returns leftmost words up to maxLength", () => {
    const sut = "The quick brown fox jumps";
    assert.deepEqual(leftWords(sut, 1), "");
    assert.deepEqual(leftWords(sut, 3), "The");
    assert.deepEqual(leftWords(sut, 5), "The");
    assert.deepEqual(leftWords(sut, 10), "The quick");
    assert.deepEqual(leftWords(sut, 18), "The quick brown");
    assert.deepEqual(leftWords(sut, 22), "The quick brown fox");
    assert.deepEqual(leftWords(sut, sut.length), sut);
    assert.notDeepEqual(leftWords(sut, sut.length - 1), sut);
  });
});

test("timestampForDir formats a timestamp", () => {
  assert.strictEqual(
    timestampForDir(one_very_special_centennial),
    "2059-05-20_16-11-42",
  );
});

test("titleizeDate makes a date suitable for part of a default document title", () => {
  assert.strictEqual(titleizeDate(one_very_special_centennial), "May 20 2059");
});
