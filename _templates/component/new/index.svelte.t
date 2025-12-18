---
to: src/components/<%= h.changeCase.pascalCase(name) %>.svelte
---
<script lang="ts">
  const <%= h.changeCase.snakeCase(name) %> = $state("<%= name %>");
</script>

<h1><%= h.changeCase.pascalCase(name) %></h1>

<p>{<%= h.changeCase.snakeCase(name) %>} works fine</p>

<style>
  h1 {
    color: #888;
  }
  p {
    border: thin solid black;
  }
</style>


