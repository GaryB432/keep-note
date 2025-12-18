import { describe, it, expect } from "vitest";
import { greet } from "../../src/markdown/document";

describe("Document stub", () => {
  it("should greet the whole world as one for now, whatever 'document' may be", () => {
    expect(greet("world")).toEqual("Hello world from: Document");
  });
});
