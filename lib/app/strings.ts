export function enquote(str: string, double = true) {
  const q = double ? '"' : "'";
  return [q, str.trim(), q].join("");
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
  return response.trim();
}

export function titleizeDate(date: Date | number): string {
  const formatter = new Intl.DateTimeFormat("en-US", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  const parts = formatter.formatToParts(date);

  return [
    parts.find((p) => p.type === "month")?.value,
    parts.find((p) => p.type === "day")?.value,
    parts.find((p) => p.type === "year")?.value,
  ].join(" ");
}

export const HASH = "#";
export const SPACE = " ";
export const FENCE = "```";
export function timestampForDir(timestamp: Date): string {
  const pad = (value: number): string => String(value).padStart(2, "0");

  const date = [
    timestamp.getFullYear(),
    pad(timestamp.getMonth() + 1),
    pad(timestamp.getDate()),
  ].join("-");

  const time = [
    pad(timestamp.getHours()),
    pad(timestamp.getMinutes()),
    pad(timestamp.getSeconds()),
  ].join("-");

  return `${date}_${time}`;
}
