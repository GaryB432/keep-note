export function add(a: number, b: number): number {
  return a + b;
}
export function greet(name: string): string {
  return `strings says: hello to ${name}`;
}
export const meaning: { life: number } = {
  life: 42,
};

export function hyphenate_date(date: Date | number): string {
  return new Intl.DateTimeFormat()
    .formatToParts(date)
    .map((t) => (t.type === "literal" ? "-" : t.value))
    .join("");
}

export function leftWords(s: string, maxLength = 100): string {
  const words = s.replace(/[^a-zA-Z0-9._-]+/g, "\t\t").split(/\s+/);

  let response = "";

  for (const word of words) {
    response += word;
    if (response.length > maxLength) {
      response = response.slice(0, -(word.length + 1));
      break;
    } else {
      response += " ";
    }
  }
  return response;
}

export function spaces(count: number): string {
  return Array(count).fill(" ").join("");
}

export function stringify(o: null | string | undefined): string | undefined {
  if (!o) return undefined;
  if (!o || o.trim().length === 0) {
    return undefined;
  }
  return o?.replace(/\n/g, " ").replace(/\s+/g, " ").trim();
}
