
function CreateArduinoSketchPrompt({
  programDescription,
}) {
  return `
I need you to create an Arduino program based on the following description:

${programDescription}

Give me an implementation based on this description. Add lots of comments so the code is easier to understand.
Give me everything inside one block of code only.
`.replace(/(\r\n|\n|\r)/gm, "");
}
export { CreateArduinoSketchPrompt };
