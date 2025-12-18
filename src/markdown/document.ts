// TODO better
const HASHES = "######";
const SPACES = "      ";

export interface MarkdownDocumentOptions {
  separator: "<<" | "";
}

export class MarkdownDocument {
  private readonly plainLines: string[] = [];
  constructor(private opts: MarkdownDocumentOptions) {}

  get lines() {
    const working_lines = [...this.plainLines];
    const last_line = working_lines.pop();
    return last_line === this.opts.separator ? working_lines : this.plainLines;
  }

  public appendParagraph(text: string) {
    this.append([text]);
  }

  public appendHeading(text: string, level = 1) {
    this.append([text], (s) => HASHES.slice(0, level).concat(" ").concat(s));
  }

  public appendList(lines: string[], numbered = false, level = 1) {
    this.append(lines, (s) =>
      SPACES.slice(0, level * 3)
        .concat(numbered ? "1." : "-")
        .concat(" ")
        .concat(s),
    );
  }

  private append(lines: string[], pre: (s: string) => string = (s) => s) {
    this.plainLines.push(
      ...lines.filter((line) => line !== this.opts.separator).map(pre),
      this.opts.separator,
    );
  }
}
