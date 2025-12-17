---
to: tests/<%= h.changeCase.kebabCase(lib) %>/<%= h.changeCase.kebabCase(name) %>.spec.ts
---
import { describe, it, expect } from "vitest";
import { greet } from "../../src/<%= h.changeCase.kebabCase(lib) %>/<%= h.changeCase.kebabCase(name) %>";

describe("<%= h.changeCase.pascalCase(name) %> stub", () => {
  it("should greet the whole world as one for now, whatever '<%= name %>' may be", () => {
    expect(greet("world")).toEqual("Hello world from: <%= h.changeCase.pascalCase(name) %>");
  });
});
