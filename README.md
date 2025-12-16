# Keep Notes

A chromium browser extension to export Google Keep notes to markdown

## Development

1. Install dependencies:

```bash
npm install
```

2. Start development server:

```bash
npm run dev
```

3. Open Chrome and navigate to `chrome://extensions/`, enable "Developer mode", and load the unpacked extension from the `dist` directory.

4. Build for production:

```bash
npm run build
```

## Project Structure

- `src/popup/` - Extension popup UI
- `src/content/` - Content scripts
- `src/keep/` - Functions and values for [google-keep](https://support.google.com/keep#topic=6262468) handling
- `src/markdown/` - Functions and values for markdown handling
- `manifest.config.ts` - Chrome extension manifest configuration

## Chrome Extension Development Notes

- Use `manifest.config.ts` to configure your extension
- The CRXJS plugin automatically handles manifest generation
- Content scripts should be placed in `src/content/`
- Popup UI should be placed in `src/popup/`

## Documentation

- [Google Keep Help](https://support.google.com/keep#topic=6262468)
- [GitHub Flavored Markdown Spec](https://github.github.com/gfm/)
- [Vite Documentation](https://vitejs.dev/)
- [CRXJS Documentation](https://crxjs.dev/vite-plugin)
