
import { get_google_api_keyAICompletion } from "./pieces/get_google_api_keyAICompletion.js";
import { get_google_api_keyCustomJobLoop } from "./pieces/get_google_api_keyCustomJobLoop.js";
import { get_google_api_keyJobLoop } from "./pieces/get_google_api_keyJobLoop.js";


export async function DoTheAPIWork(job) {
  // This is an example job that just slowly reports on progress
  // while doing no work. Replace this with your own job logic.
  // in this logic, progress is q percentage number varying between
  // 0 % and 100 %
  return get_google_api_keyJobLoop(job);

  // This is a job that does some AI powered QNA stuff
  // return get_google_api_keyAICompletion(job);

  // This is an empty job for you
  //return get_google_api_keyCustomJobLoop(job);
}
