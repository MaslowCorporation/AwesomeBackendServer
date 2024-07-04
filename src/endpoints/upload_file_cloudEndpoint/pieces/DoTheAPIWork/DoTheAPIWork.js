
import { upload_file_cloudAICompletion } from "./pieces/upload_file_cloudAICompletion.js";
import { upload_file_cloudCustomJobLoop } from "./pieces/upload_file_cloudCustomJobLoop.js";
import { upload_file_cloudJobLoop } from "./pieces/upload_file_cloudJobLoop.js";


export async function DoTheAPIWork(job) {
  // This is an example job that just slowly reports on progress
  // while doing no work. Replace this with your own job logic.
  // in this logic, progress is q percentage number varying between
  // 0 % and 100 %
  //return upload_file_cloudJobLoop(job);

  // This is a job that does some AI powered QNA stuff
  // return upload_file_cloudAICompletion(job);

  // This is an empty job for you
  return upload_file_cloudCustomJobLoop(job);
}
