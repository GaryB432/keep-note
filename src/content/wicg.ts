export async function saveFileWithPicker(
  contents: FileSystemWriteChunkType,
  suggestedName?: string,
) {
  try {
    suggestedName ??= someDefaultName();
    const fileHandle = await window.showSaveFilePicker({
      suggestedName,
      types: [
        { description: "Markdown", accept: { "text/x-markdown": ".md" } },
      ],
    });

    // Create a writable stream
    const writable = await fileHandle.createWritable();

    // Write the contents
    await writable.write(contents);

    // Close the file and write the contents to disk
    await writable.close();
    console.log("File saved successfully!");
  } catch (err) {
    console.error("Error saving file:", err);
  }
}

function someDefaultName(): string | undefined {
  return `keep-inbox-${new Date().toISOString()}.md`;
}
