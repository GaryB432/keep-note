import assert from "node:assert";
import { describe, test } from "node:test";

import type { Note } from "../keep/types.d.ts";

import { createSingleDocument } from "./summarizer.ts";

describe("Summarizer", () => {
  test("createSingleDocument with basic note", async () => {
    const notes = [
      {
        color: "yellow",
        createdTimestampUsec: 1,
        isArchived: false,
        isTrashed: false,
        textContent: "This is a test note.",
        textContentHtml: "<p>This is a test note.</p>",
        title: "Test Note",
        userEditedTimestampUsec: 2,
      },
    ];
    const doc = await createSingleDocument(notes, "~/a/b", "mnt/e/fun", false);
    assert.deepEqual(doc.lines, ["# Test Note", "", "This is a test note."]);
  });

  test("createSingleDocument with annotation and attachment", async () => {
    const notes: Note[] = [
      {
        annotations: [
          {
            description: "Matt's link",
            source: "WEBLINK",
            title: "Testers Extravaganza - 2 Recommendations - Testerton, CA",
            url: "https://nextdoor.com/pages/matt-subject-testerton-ca-5/",
          },
        ],
        attachments: [{ filePath: "foo.pdf", mimetype: "application/pdf" }],
        color: "blue",
        createdTimestampUsec: 1,
        isArchived: false,
        isTrashed: false,
        textContent: "Body",
        textContentHtml: undefined,
        title: "Note with extras",
        userEditedTimestampUsec: 2,
      },
    ];
    const doc = await createSingleDocument(notes, "keepdump", "pkm", false);
    assert.deepEqual(doc.lines, [
      "# Note with extras",
      "",
      "Body",
      "",
      "- [Testers Extravaganza - 2 Recommendations - Testerton, CA](https://nextdoor.com/pages/matt-subject-testerton-ca-5/)",
      "",
      "## Attachments",
      "",
      "```bash",
      'cp "keepdump/foo.pdf" "pkm/foo.pdf"',
      "",
      "```",
    ]);
  });

  test("createSingleDocument with empty notes array returns empty doc", async () => {
    const doc = await createSingleDocument([], "~/a/b", "mnt/e/fun", false);
    assert.ok(doc.lines.length === 0);
  });
});
