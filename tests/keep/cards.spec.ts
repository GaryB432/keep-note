import jsdom from "jsdom";
import { readFileSync } from "node:fs";
import { join } from "node:path";
import { expect, test } from "vitest";
import { toNote } from "../../src/keep/parser";

const { JSDOM } = jsdom;

const [descale, gates, shared, simple_list, simple, leveraging_chaos] = [
  "descale",
  "gates",
  "shared",
  "simple-list",
  "simple",
  "leveraging_chaos",
].map((f) =>
  readFileSync(
    join(import.meta.dirname, "..", "fixtures", "cards", f.concat(".html")),
    "utf-8",
  ),
);

test("descale", () => {
  const dom = new JSDOM();
  dom.window.document.body.insertAdjacentHTML("afterend", descale);
  const note = toNote(dom.window.document.querySelector("div:nth-child(1)")!);
  expect(note.title).toEqual("Descale K-Slim w ICED");
  expect(note.anchors).toEqual([]);
  expect(note.images).toEqual([]);
  expect(note.blocks).toMatchInlineSnapshot(`
    [
      [
        "vinegar is above refrigerator",
        "14oz vinegar + 14oz water (50/50) in resevoir",
        "remove any spent k-cup",
        "close lid (leave closed for duration)",
        "unplug/replug",
        "press 8 and 12 for 3 seconds (descale lights up)",
        "press K and dump until add water lamp",
        "fresh water rinses",
        "this is empty irl but need not be",
        undefined,
        undefined,
        "[HOW TO TURN DESCALE LIGHT OFF Keurig…",
      ],
    ]
  `);
});

test("gates", () => {
  const dom = new JSDOM();
  dom.window.document.body.insertAdjacentHTML("afterend", gates);
  const note = toNote(dom.window.document.querySelector("div:nth-child(1)")!);
  expect(note.title).toEqual("Gate locks");
  expect(note.anchors).toEqual([]);
  expect(note.blocks).toMatchInlineSnapshot(`
    [
      [
        "North Gate 1315",
        "Back 6641",
        "South 1434",
        "👉",
      ],
    ]
  `);
});

test("shared", () => {
  const dom = new JSDOM();
  dom.window.document.body.insertAdjacentHTML("afterend", shared);
  const note = toNote(dom.window.document.querySelector("div:nth-child(1)")!);
  expect(note.title).toEqual("House & suppliess");
  expect(note.anchors).toEqual([]);
  expect(note.images).toEqual([]);
  expect(note.blocks).toMatchInlineSnapshot(`
    [
      [
        "Bird seed",
        "Outdoor thermometers not small",
        "White tape for blinds",
        "Caulk or ?",
        "Compass",
        "Scoop large f28, I 10. For dog food and mulch, seed etc",
        "Target Luxor set ask for shipping??",
        "Kitchen light?",
        "Manure/compost/topsoil",
        "Tablecloth",
      ],
    ]
  `);
});

test("list", () => {
  const dom = new JSDOM();
  dom.window.document.body.insertAdjacentHTML("afterend", simple_list);
  const note = toNote(dom.window.document.querySelector("div:nth-child(1)")!);
  expect(note.title).toBeUndefined();
  expect(note.anchors).toEqual([]);
  expect(note.images).toEqual([]);
  expect(note.blocks).toMatchInlineSnapshot(`
    [
      [
        "Banana",
        "Extension",
        "Broach",
        "Hancock",
      ],
    ]
  `);
});

test("simple", () => {
  const dom = new JSDOM();
  dom.window.document.body.insertAdjacentHTML("afterend", simple);
  const note = toNote(dom.window.document.querySelector("div:nth-child(1)")!);
  expect(note.title).toBeUndefined();
  expect(note.anchors).toEqual([]);
  expect(note.images).toEqual([]);
  expect(note.blocks).toMatchInlineSnapshot(`
    [
      [
        "Play action pass",
      ],
    ]
  `);
});

test("leveraging_chaos", () => {
  const dom = new JSDOM();
  dom.window.document.body.insertAdjacentHTML("afterend", leveraging_chaos);
  const note = toNote(dom.window.document.querySelector("div:nth-child(1)")!);
  expect(note.title).toBeUndefined();
  expect(note.anchors).toEqual([]);
  expect(note.images).toEqual([
    {
      src: "/u/",
    },
  ]);
  expect(note.blocks).toMatchInlineSnapshot(`
    [
      [
        "zettelkasten is a system of anarchy for leveraging chaos",
      ],
    ]
  `);
});
