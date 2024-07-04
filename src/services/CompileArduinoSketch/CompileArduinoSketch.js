

// Import the required modules
import { exec } from 'child_process';
import fs from 'fs';
import path from 'path';
import { GetFileContentsIfExisting } from '../GetFileContentsIfExisting/GetFileContentsIfExisting.js';
import { OSWork } from '../OSWork/OSWork.js';






// Function to compile the Arduino source code
/**
 * Compiles given Arduino (.ino) source code to .hex string.
 *
 * @param {String} code_string - The .ino source code that needs to be compiled.
 * @param {String} sketchName - The sketch's file/folder name
 * @param {String} inputFolder - The folder that will contain the .ino source code.
 * @param {String} outputFolder - The folder that will contain the compiled. files.
 * @param {Function} onSuccess - Callback that takes the generated .hex source code string as an argument.
 * @param {Function} onError - Callback that takes any eventual error during compilation as an argument.
 * 
 * For this to work on a server, you must install arduino-cli: 
 * 
 * https://arduino.github.io/arduino-cli/0.35/installation/
 * 
 * Then run this command to install avr stuff
 * 
 * arduino-cli core install arduino:avr
 * 
 * And it should work !
 * 
 */
export async function CompileArduinoSketch({
    code_string,
    sketchName,
    inputsFolder,
    outputsFolder,
    onSuccess,
    onError
}) {
    try {
        

        // Create input and output directories
        fs.mkdirSync(inputsFolder, { recursive: true });



        fs.mkdirSync(outputsFolder, { recursive: true });



        const inputFolder = path.join(inputsFolder, sketchName);
        const outputFolder = path.join(outputsFolder, sketchName);

        const arduino_cli_path = await OSWork({
            onWindows: () => "./ImportantAssets/arduino-cli/arduino-cli-windows.exe",
            onLinux: () => "./ImportantAssets/arduino-cli/arduino-cli-linux",
            onMacOS: () => "./ImportantAssets/arduino-cli/arduino-cli-macos",
        })

        // Install the arduino related stuff if needed,
        // then run the sketch new command with arduino-cli to create sketch folder
        const newSketchCommand = `${arduino_cli_path} core install arduino:avr; ./${arduino_cli_path} sketch new ${inputFolder}`;
        exec(newSketchCommand, async (err) => {
            

            if (err) {
                onError(err);  // Handle the error in sketch creation
            } else {
                // Create a temporary .ino file with the provided source code in the sketch folder
                const inoFilePath = `${inputFolder}/${sketchName}.ino`;
                fs.writeFileSync(inoFilePath, code_string);



                // Define the Fully Qualified Board Name (FQBN) for your specific Arduino board
                const fqbn = 'arduino:avr:uno';

                // Run compile command with arduino-cli to compile the sketch
                const compileCommand = `${arduino_cli_path} compile --fqbn ${fqbn} --output-dir ${outputFolder} ${inoFilePath}`;
                exec(compileCommand, async (err, stdout) => {
                    

                    if (err) {
                        onError(err); // Handle compilation errors
                    } else {
                        // Compiled .hex file path
                        const hexFilePath = `${outputFolder}/${sketchName}.ino.hex`;
                        const hexBootFilePath = `${outputFolder}/${sketchName}.ino.with_bootloader.hex`;

                        try {
                            // Read the compiled .hex file data
                            const hexFileData = GetFileContentsIfExisting(hexFilePath);
                            const hexBootFileData = GetFileContentsIfExisting(hexBootFilePath);


                            // Delete the input and output directories
                            fs.rmSync(inputFolder, { recursive: true, force: true }); // Delete the source code folder
                            fs.rmSync(outputFolder, { recursive: true, force: true }); // Delete the output files folder



                            // Call onSuccess callback with the .hex file data
                            onSuccess({
                                hex: hexFileData,
                                hex_with_bootloader: hexBootFileData
                            });
                        } catch (err) {
                            onError(err); // Handle file read/delete error
                        }
                    }
                });
            }
        });
    } catch (err) {


        // Handle any error that occurs while writing to the temporary .ino file or creating directories
        onError(err);
    }
}
