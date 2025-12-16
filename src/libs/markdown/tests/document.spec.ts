import { describe, it, expect } from "vitest";
import { greet } from "../../../markdown/document";

describe("Document stub", () => {
  it("should greet the whole world as one", () => {
    expect(greet("world")).toEqual("Hello world from: Document");
  });
});
