const HASHES = "######";
const SPACES = "      ";
const FENCE = "```";

export interface MarkdownDocumentOptions {
  separator: "" | "<<";
}

export class MarkdownDocument {
  get lines(): string[] {
    const working_lines = [...this.plainLines];
    const last_line = working_lines.pop();
    return last_line === this.opts.separator ? working_lines : this.plainLines;
  }
  private opts: MarkdownDocumentOptions;
  private readonly plainLines: string[] = [];
  constructor(opts: MarkdownDocumentOptions = { separator: "" }) {
    this.opts = opts;
  }

  public appendCode(lines: string[], language?: string): void {
    this.append([FENCE.concat(language ?? ""), ...lines, FENCE]);
  }

  public appendHeading(text: string, level = 1): void {
    this.append([text], (s) => HASHES.slice(0, level).concat(" ").concat(s));
  }

  public appendHorizontalRule() {
    this.append(["", "---", ""]);
  }

  public appendList(lines: string[], numbered = false, level = 1): void {
    this.append(lines, (s) =>
      SPACES.slice(0, level * 3)
        .concat(numbered ? "1." : "-")
        .concat(" ")
        .concat(s),
    );
  }

  public appendParagraph(text: string): void {
    this.append([text]);
  }

  private append(lines: string[], pre: (s: string) => string = (s) => s): void {
    this.plainLines.push(
      ...normalizeMarkdown(lines, this.opts).map(pre),
      this.opts.separator,
    );
  }
}

export function normalizeMarkdown(
  lines: string[],
  opts: MarkdownDocumentOptions,
): string[] {
  const result: string[] = [];
  let lastType = "none";

  for (const line of lines) {
    const currentType = detectBlockType(line, opts);

    // If we transition to a new block type (and it's not the first line),
    // inject a blank line if one isn't already there.
    if (
      lastType !== "none" &&
      lastType !== "blank" &&
      currentType !== lastType &&
      currentType !== "blank"
    ) {
      if (result[result.length - 1] !== opts.separator) {
        result.push(opts.separator);
      }
    }

    result.push(line);
    lastType = currentType;
  }
  return result;
}

function detectBlockType(line: string, opts: MarkdownDocumentOptions) {
  const trimmed = line.trim();
  if (trimmed === opts.separator) return "blank";
  if (/^#{1,6}\s/.test(trimmed)) return "heading";
  if (/^[*-]\s|\d+\.\s/.test(trimmed)) return "list";
  if (/^>/.test(trimmed)) return "blockquote";
  if (trimmed === FENCE) return "code_fence";
  return "paragraph";
}
