# keep-note

## Vision

Processing Google Keep Takeout for PKM

## Mission

Fast, simple CLI tool for a go-between application to convert Keep Takeout files to GFM Markdown.

## Features

- keep-note
- Interactive & non-interactive modes
- Customizable setups

## Technical Overview

- Entry: `bin.js` (uses `cac`)
- Prompts: `@clack/prompts`
- File generation: `templates.js`
- Testing: `test-pm.js`

## Getting Started

```bash
node gb/pm/bin.js
```

---

1. **package.json `"type": "module"`**
   - Include a `bin` entry to make the CLI executable (e.g., `"my-cli": "./cli.ts"`).
   - Configure the `scripts` section to run the TypeScript CLI directly using Node's `--experimental...` flag(s), avoiding the need for a separate build step (e.g., `"dev": "node --experimental-strip-types ./cli.ts --watch"`).
   - Do not set up path aliases using the `imports` field to allow for clean, absolute-style imports (e.g., `"#lib/*": "./lib/*.ts"`).

2. **TypeScript & ESM:**
   - The main entry point should be a `cli.ts` file at the root.
   - This `cli.ts` file must have a shebang (`#!/usr/bin/env node`) at the top, including `--experimental` flags as necessary.
   - All file imports within the project must use the full file extension (e.g., `import { something } from './lib/utils.ts';`), as is required by native ESM in Node.js.

3. **Dependencies:**
   - Use `cac` for robust command-line argument parsing.
   - Use `@clack/prompts` for creating an interactive user experience.
