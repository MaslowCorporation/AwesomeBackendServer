import { GenerateAudioFromTxt } from "../../../../../services/GenerateAudioFromTxt/GenerateAudioFromTxt.js";

/**
 * 
 * @param {*} job 
 * 
 * @returns your own shizzle
 */
export async function generate_audio_from_txtCustomJobLoop(job) {
  /**
   * Some useful info:
   * 
   * - job.data contains the args 
   * you have passed in the generate_audio_from_txtLongWork.js file.
   * 
   * - job.progress() is a method that allows you to save serializable progress data
   * that the user can get using the get_work_status endpoint.
   */

  const OPENAI_API_KEY = process.env.OPENAI_API_KEY;



  return new Promise((resolve, reject) => {

    GenerateAudioFromTxt({
      apiKey: OPENAI_API_KEY,
      text: job.data.text,
      voice: job.data.voice,
      onSuccess: (result) => {
        resolve(result);
      },
      onError: (e) => {
        reject(e);
      },
    });
  });
}


