import { CompileArduinoSketch } from "../../../../../services/CompileArduinoSketch/CompileArduinoSketch.js";

/**
 * 
 * @param {*} job 
 * 
 * @returns your own shizzle
 */
export async function compile_arduino_sketchCustomJobLoop(job) {
  /**
   * Some useful info:
   * 
   * - job.data contains the args 
   * you have passed in the compile_arduino_sketchLongWork.js file.
   * 
   * - job.progress() is a method that allows you to save serializable progress data
   * that the user can get using the get_work_status endpoint.
   */

  return new Promise((resolve, reject) => {

    /** 
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
    CompileArduinoSketch({
      code_string: job.data.code_string,
      sketchName: job.data.sketchName,
      inputsFolder: "./arduino/inputs",
      outputsFolder: "./arduino/outputs",
      onSuccess: (data) => {

        /**
         * data contains the generated hex code. In an object
         * 
{
    hex: hexFileData,
    hex_with_bootloader: hexBootFileData
}
         */
        resolve(data);
      },
      onError: (e) => {


        reject(e);
      },
    });

  });
}


