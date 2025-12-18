import { describe, it, expect } from "vitest";
import { greet } from "../../src/shared/strings";

describe("Strings stub", () => {
  // TODO do
  it("should greet the whole world as one for now, whatever 'strings' may be", () => {
    expect(greet("world")).toEqual("Hello world from: Strings");
  });
});
