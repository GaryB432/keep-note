export const greet = (name: string) => `Hello ${name} from: Strings`;

export function stringify(
  o: string | Element | undefined | null
): string | undefined {
  if (!o) return undefined;
  const s = typeof o === "string" ? o : o?.textContent;
  if (!s || s.trim().length === 0) {
    return undefined;
  }
  return s?.replace(/\n/g, " ").replace(/\s+/g, " ").trim();
}

export function spaces(count: number) {
  return Array(count).fill(" ").join("");
}
