import { describe, expect, it } from "vitest";
import { leftWords } from "../../src/shared/strings";

const LOREM =
  "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Aliquid quis ratione impedit tenetur ullam nam perferendis exercitationem id iste repellat laudantium aperiam, sunt cum at perspiciatis? Ratione accusamus eaque molestias.";

describe("Strings stub", () => {
  it("defaults length", () => {
    expect(leftWords(LOREM /* default value */).length).toBeLessThanOrEqual(
      100,
    );
  });

  it("fine tunes leftWords", () => {
    expect(leftWords(LOREM, 9)).toEqual("Lorem");
    expect(leftWords(LOREM, 10)).toEqual("Lorem");
    expect(leftWords(LOREM, 11)).toEqual("Lorem ipsum");
    expect(leftWords(LOREM, 12)).toEqual("Lorem ipsum");
  });
});
