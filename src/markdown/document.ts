export const greet = (name: string) => `Hello ${name} from: Document`;

const HASHES = "######";
const SPACES = "      ";

export class MarkdownDocument {
  private readonly plainLines: string[] = [];
  constructor(private separator = "") {}

  get lines() {
    const working_lines = [...this.plainLines];
    const last_line = working_lines.pop();
    return last_line === this.separator ? working_lines : this.plainLines;
  }

  public appendParagraph(lines: string[]) {
    this.append(lines, (s) => s);
  }

  public appendHeading(lines: string, level = 1) {
    this.append([lines], (s) => HASHES.slice(0, level).concat(" ").concat(s));
  }

  public appendList(lines: string[], numbered = false, level = 1) {
    this.append(lines, (s) =>
      SPACES.slice(0, level * 3)
        .concat(numbered ? "1." : "-")
        .concat(" ")
        .concat(s)
    );
  }

  private append(lines: string[], pre: (s: string) => string = (s) => s) {
    this.plainLines.push(
      ...lines.filter((line) => line !== this.separator).map(pre),
      this.separator
    );
  }
}
