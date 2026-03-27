import { glob, readFile } from "node:fs/promises";
import { join, parse } from "node:path";

/** @typedef {id:number, email?:string} Annotation */
/** @typedef {filePath:string, mimetype:string} Attachment */
/** @typedef {name:string} Label */
/** @typedef {textHtml:string,text:string,isChecked?:boolean} ListItem */
/** @typedef {id:string} Task */

/**
 * @typedef {Object} Note
 * @property {Annotation[]} [annotations]
 * @property {Attachment[]} [attachments]
 * @property {string} color
 * @property {boolean} isTrashed
 * @property {boolean} [isPinned]
 * @property {boolean} isArchived
 * @property {Label[]} [labels]
 * @property {ListItem[]} [listContent]
 * @property {Task[]} [tasks]
 * @property {string} textContent
 * @property {string} title
 * @property {number} userEditedTimestampUsec
 * @property {number} createdTimestampUsec
 * @property {string} textContentHtml
 */

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

  /** @type {Note[]} */
  const allNotes = jsons.map((d) => JSON.parse(d));

  return allNotes;
}
