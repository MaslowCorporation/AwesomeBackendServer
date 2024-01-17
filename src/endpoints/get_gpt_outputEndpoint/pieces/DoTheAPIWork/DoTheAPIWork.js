
import { get_gpt_outputAICompletion } from "./pieces/get_gpt_outputAICompletion.js";
import { get_gpt_outputCustomJobLoop } from "./pieces/get_gpt_outputCustomJobLoop.js";
import { get_gpt_outputJobLoop } from "./pieces/get_gpt_outputJobLoop.js";


export async function DoTheAPIWork(job) {
  // This is an example job that just slowly reports on progress
  // while doing no work. Replace this with your own job logic.
  // in this logic, progress is q percentage number varying between
  // 0 % and 100 %
  //return get_gpt_outputJobLoop(job);

  // This is a job that does some AI powered QNA stuff
  return get_gpt_outputAICompletion(job);

  // This is an empty job for you
  //return get_gpt_outputCustomJobLoop(job);
}
