import { Constants } from "../../../../../AppConstants/Constants.js";
import { GetChatGPTArt } from "../../../../../services/GetChatGPTArt/GetChatGPTArt.js";

/**
 * 
 * @param {*} job 
 * 
 * @returns your own shizzle
 */
export async function get_gpt_artCustomJobLoop(job) {
  /**
   * Some useful info:
   * 
   * - job.data contains the args 
   * you have passed in the get_gpt_artLongWork.js file.
   * 
   * - job.progress() is a method that allows you to save serializable progress data
   * that the user can get using the get_work_status endpoint.
   */
  return new Promise((resolve, reject) => {
    GetChatGPTArt({
      model_chosen: job.data.model_chosen,
      prompt: job.data.prompt,
      apiKey: process.env.OPENAI_API_KEY,
      img_width: job.data.img_width,
      img_height: job.data.img_height,
      onSuccess: (data) => {
        resolve(data);
      },
      onError: (e) => {
        reject(e);
      },
    });
  });
}


