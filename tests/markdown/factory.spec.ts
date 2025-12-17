import { describe, it, expect } from "vitest";
import { greet } from "../../src/markdown/factory";

describe("Factory stub", () => {
  it("should greet the whole world as one for now, whatever 'factory' may be", () => {
    expect(greet("world")).toEqual("Hello world from: Factory");
  });
});
