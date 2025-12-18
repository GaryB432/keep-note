export const greet = (name: string) => `Hello ${name} from: Wicg`;
export async function saveFileWithPicker(contents: FileSystemWriteChunkType) {
  console.log(contents);
  try {
    // Show a file picker and get a file handle
    const fileHandle = await window.showSaveFilePicker({
      suggestedName: `keep-inbox-${new Date().toUTCString()}.md`,
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
