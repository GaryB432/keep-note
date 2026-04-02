import type { Note } from "#lib/keep/types.d";

import { describe, expect, test } from "vitest";

import { createSingleDocument } from "./summarizer";

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
    expect(doc.lines).toEqual(["# Test Note", "", "This is a test note."]);
  });

  test("createSingleDocument with annotation and attachment", async () => {
    const notes: Note[] = [
      {
        annotations: [
          {
            description: "Matt's link",
            source: "WEBLINK",
            title: "Rogers Lawn Care - 2 Recommendations - Ballwin, MO",
            url: "https://nextdoor.com/pages/matt-rogers-ballwin-mo-5/",
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
    expect(doc.lines).toMatchInlineSnapshot(`
      [
        "# Note with extras",
        "",
        "Body",
        "",
        "- [Rogers Lawn Care - 2 Recommendations - Ballwin, MO](https://nextdoor.com/pages/matt-rogers-ballwin-mo-5/)",
        "",
        "## Attachments",
        "",
        "\`\`\`bash",
        "cp keepdump/foo.pdf pkm/foo.pdf",
        "\`\`\`",
      ]
    `);
  });

  test("createSingleDocument with empty notes array returns empty doc", async () => {
    const doc = await createSingleDocument([], "~/a/b", "mnt/e/fun", false);
    expect(doc.lines.length).toBe(0);
  });
});
