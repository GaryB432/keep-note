---
to: src/<%= h.changeCase.kebabCase(lib) %>/<%= h.changeCase.kebabCase(name) %>.ts
---
export const greet = (name: string) => `Hello ${name} from: <%= h.changeCase.pascalCase(name) %>`;
