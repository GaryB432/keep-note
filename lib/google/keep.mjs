// export type Note = {
//   annotations?: Annotation[];
//   color: string;
//   isTrashed: boolean;
//   isArchived: boolean;
//   textContent: string;
//   title: string;
//   userEditedTimestampUsec: number;
//   createdTimestampUsec: number;
//   textContentHtml: string;
// };
import { glob, readFile } from "node:fs/promises";
import { join, parse } from "node:path";

export function greet(name) {
  return `reader says: hello to ${name}`;
}

/**
 * @typedef Annotation
 * @property {string} description
 *
 */

/**
 * @typedef Note 
 * @property {Annotation[]?} annotations
 * @property {string} color
 * @property {boolean} isTrashed
 * @property {boolean} isArchived
 * @property {string} textContent
 * @property {string} title
 * @property {number} userEditedTimestampUsec
 * @property {number} createdTimestampUsec
 * @property {string} textContentHtml
 */

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
   * @type {Note[]}
   */
  const ddu = jsons.map((d) => JSON.parse(d));

  return ddu;
}
