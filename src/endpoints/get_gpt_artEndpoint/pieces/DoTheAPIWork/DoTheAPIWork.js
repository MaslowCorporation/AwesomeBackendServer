
import { get_gpt_artAICompletion } from "./pieces/get_gpt_artAICompletion.js";
import { get_gpt_artCustomJobLoop } from "./pieces/get_gpt_artCustomJobLoop.js";
import { get_gpt_artJobLoop } from "./pieces/get_gpt_artJobLoop.js";


export async function DoTheAPIWork(job) {
  // This is an example job that just slowly reports on progress
  // while doing no work. Replace this with your own job logic.
  // in this logic, progress is q percentage number varying between
  // 0 % and 100 %
  //return get_gpt_artJobLoop(job);

  // This is a job that does some AI powered QNA stuff
  // return get_gpt_artAICompletion(job);

  // This is an empty job for you
  return get_gpt_artCustomJobLoop(job);
}
