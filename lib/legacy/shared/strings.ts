export function stringify(
  o: string | Element | undefined | null,
): string | undefined {
  if (!o) return undefined;
  const s = typeof o === "string" ? o : o?.textContent;
  if (!s || s.trim().length === 0) {
    return undefined;
  }
  return s?.replace(/\n/g, " ").replace(/\s+/g, " ").trim();
}

export function spaces(count: number): string {
  return Array(count).fill(" ").join("");
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
