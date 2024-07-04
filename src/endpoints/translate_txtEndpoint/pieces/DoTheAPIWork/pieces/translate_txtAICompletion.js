import { Constants } from "../../../../../AppConstants/Constants.js";
import { GetJobQueue } from "../../../../../BackgroundWorker/GetJobQueue.js";
import { Delay } from "../../../../../services/Delay/Delay.js";
import { GetChatGPTOutput } from "../../../../../services/GetChatGPTOutput/GetChatGPTOutput.js";
import { UnquoteString } from "../../../../../services/UnquoteString/UnquoteString.js";
import { CancelJobIfNeeded } from "./CancelJobIfNeeded.js";

/**
 * 
 * @param {*} job 
 * 
 * @returns a QNA wizard
 */
export async function translate_txtAICompletion(job) {
  /**
   * Below is some example timer code.
   * 
   * You can delete it all, and implement your own thing.
   * 
   * Some useful info:
   * 
   * - job.data contains the args 
   * you have passed in the endpoint_nameLongWork.js file
   * 
   * - job.progress() is a method that allows you to save serializable progress data
   * that the user can get using the get_work_status endpoint.
   * 
   */




  const OPENAI_API_KEY = process.env.OPENAI_API_KEY;

  return new Promise((resolve, reject) => {

    let result = "";

    job.progress(result);

    GetChatGPTOutput({
      model_chosen: job.data.model_chosen ?? "gpt-3.5-turbo",
      prompt: `Translate the following string to ${job.data.language}, and return the translated string: '${job.data.text.trim()}'`,
      apiKey: OPENAI_API_KEY,
      onProgress: (progress) => {
        // progress in an object looking like
        // { chunk, inputTokens }
        result += progress.chunk;

        job.progress(result)
      },
      onSuccess: (result) => {
        // result in an object looking like
        // { result, inputTokens, outputTokens }
        const translation = result.result.trim();
        const unquotedTranslation = UnquoteString(translation);

        result.result = unquotedTranslation;

        resolve(result);
      },
      onError: (e) => {
        // e is an error message string
        reject(e);
      },
    });
  });
}


