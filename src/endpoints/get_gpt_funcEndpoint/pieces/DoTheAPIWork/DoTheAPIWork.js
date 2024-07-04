
import { get_gpt_funcAICompletion } from "./pieces/get_gpt_funcAICompletion.js";
import { get_gpt_funcCustomJobLoop } from "./pieces/get_gpt_funcCustomJobLoop.js";
import { get_gpt_funcJobLoop } from "./pieces/get_gpt_funcJobLoop.js";


export async function DoTheAPIWork(job) {
  // This is an example job that just slowly reports on progress
  // while doing no work. Replace this with your own job logic.
  // in this logic, progress is q percentage number varying between
  // 0 % and 100 %
  // return get_gpt_funcJobLoop(job);

  // This is a job that does some AI powered QNA stuff
  return get_gpt_funcAICompletion(job);

  // This is an empty job for you
  //return get_gpt_funcCustomJobLoop(job);
}
