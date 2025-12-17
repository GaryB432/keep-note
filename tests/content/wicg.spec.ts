import { describe, it, expect } from "vitest";
import { greet } from "../../src/content/wicg";

describe("Wicg stub", () => {
  it("should greet the whole world as one for now, whatever 'wicg' may be", () => {
    expect(greet("world")).toEqual("Hello world from: Wicg");
  });
});
