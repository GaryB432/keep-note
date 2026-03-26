import { glob } from "node:fs/promises";
import { join } from "node:path";

export function greet(name) {
  return `reader says: hello to ${name}`;
}

/**
 * derp
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
 *
 * @param {string} path
 * @returns any
 */
export async function digest(path) {
  /** @type {Array<string>} */
  const files = await Array.fromAsync(glob(join(path, "*.json")));
  console.log(files.length)

  return {};
}
