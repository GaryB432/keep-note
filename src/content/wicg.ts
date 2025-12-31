export async function saveFileWithPicker(
  contents: FileSystemWriteChunkType,
  suggestedName?: string,
): Promise<{ saved: boolean }> {
  try {
    suggestedName ??= someDefaultName();
    const fileHandle = await window.showSaveFilePicker({
      suggestedName,
      types: [
        { description: "Markdown", accept: { "text/x-markdown": ".md" } },
      ],
    });
    const writable = await fileHandle.createWritable();
    await writable.write(contents);
    await writable.close();
    return { saved: true };
  } catch (e) {
    const err = e as globalThis.Error;
    console.log(err.name);
  }
  return { saved: false };
}

function someDefaultName(): string | undefined {
  return `keep-inbox-${new Date().toISOString()}.md`;
}
