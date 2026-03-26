import { glob, readFile } from "node:fs/promises";
import { join, parse } from "node:path";

export function greet(name) {
  return `reader says: hello to ${name}`;
}

/**
 * @param {number} a
 * @param {number} b
 * @returns number
 */
export function add(a, b) {
  return a + b;
}

/**
 * @returns {life:number}
 */
export const meaning = {
  life: 42,
};

/**
 * @param {string} path
 */
export async function digest(path) {
  /** @type {Array<string>} */
  const files = await Array.fromAsync(glob(join(path, "*.json")));
  const documents = files
    .map((f) => parse(f))
    .filter((p) => !p.name.endsWith("_"));
  const jsons = await Promise.all(
    documents.map(async (d) => await readFile(join(d.dir, d.base), "utf-8")),
  );

  /**
   * @type {import ("./keep").Note[]}
   */
  const ddu = jsons.map((d) => JSON.parse(d));

  return ddu;
}
