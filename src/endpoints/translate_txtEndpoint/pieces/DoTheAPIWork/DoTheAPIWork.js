
import { translate_txtAICompletion } from "./pieces/translate_txtAICompletion.js";
import { translate_txtCustomJobLoop } from "./pieces/translate_txtCustomJobLoop.js";
import { translate_txtJobLoop } from "./pieces/translate_txtJobLoop.js";


export async function DoTheAPIWork(job) {
  // This is an example job that just slowly reports on progress
  // while doing no work. Replace this with your own job logic.
  // in this logic, progress is q percentage number varying between
  // 0 % and 100 %
  // return translate_txtJobLoop(job);

  // This is a job that does some AI powered QNA stuff
  return translate_txtAICompletion(job);

  // This is an empty job for you
  //return translate_txtCustomJobLoop(job);
}
