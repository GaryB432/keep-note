# keep-note

Facilitate the capture of fleeting thoughts for your personal knowledge base.

```mermaid
sequenceDiagram
    autonumber
    actor You as User
    participant Keep as Google Keep / Wearable
    participant Takeout as Google Takeout
    participant Local as Staging (/tmp/...)
    participant CLI as keep-note (bin.ts)
    participant Obs as Obsidian Vault

    %% Phase 1: Capture
    rect rgb(240, 255, 240)
        Note over You, Keep: Spontaneous Capture Phase
        You->>Keep: Quick thought (Smart Watch / Voice / Web)
        Keep-->>Keep: Stores note + attachments
    end

    %% Phase 2: Batch Export
    rect rgb(255, 245, 235)
        Note over You, Takeout: Periodic Batch Phase
        You->>Takeout: Request Google Keep Export
        Takeout-->>You: Download takeout.zip
        You->>Local: Unzip to /tmp/unzipped-downloaded-notes/
    end

    %% Phase 3: CLI Aggregation
    rect rgb(245, 245, 255)
        Note over You, Obs: Transformation & Synthesis
        You->>CLI: node ./bin.ts takeout <staging> --outDir ./pkb/summary-{%timestamp}.md
        CLI->>Local: Read JSON/HTML metadata & assets
        CLI->>Obs: Generate summary.md
    end

    %% Phase 4: Curation
    You->>Obs: Open summary.md
    You->>Obs: Cut/paste nuggets, create [[wikilinks]], tag notes
```

```bash
./bin.ts takeout /mnt/e/example/Takeout/Keep -o $ONEDRIVE/Documents/PKM
```

The command will create a `summary.md` document in the `-o` folder specified. The summary will contain horizontal-rule-delimited sections for each unarchived `note`. Each section will contain clipboard-friendly snippets of the note including a shell script to copy any attachments.

Consider archiving all the Notes taken out so they don't ge taken out again.

Organize the note sections into proper settlement in the knowledge base destination.

[Export your data from Google Keep - Google Keep Help](https://support.google.com/keep/answer/10017039?visit_id=639106789686862238-1248912857&p=keep_takeout&rd=1)

[How to download your Google data - Google Account Help](https://support.google.com/accounts/answer/3024190)

[Send a Keep note to another app - Computer - Google Keep Help](https://support.google.com/keep/answer/6320648?hl=en&ref_topic=6262828)
