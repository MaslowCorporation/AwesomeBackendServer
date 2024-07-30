
import { load_code_folderAICompletion } from "./pieces/load_code_folderAICompletion.js";
import { load_code_folderCustomJobLoop } from "./pieces/load_code_folderCustomJobLoop.js";
import { load_code_folderJobLoop } from "./pieces/load_code_folderJobLoop.js";


export async function DoTheAPIWork(job) {
  // This is an example job that just slowly reports on progress
  // while doing no work. Replace this with your own job logic.
  // in this logic, progress is q percentage number varying between
  // 0 % and 100 %
  //return load_code_folderJobLoop(job);

  // This is a job that does some AI powered QNA stuff
  // return load_code_folderAICompletion(job);

  // This is an empty job for you
  return load_code_folderCustomJobLoop(job);
}
