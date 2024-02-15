
import { google_loginAICompletion } from "./pieces/google_loginAICompletion.js";
import { google_loginCustomJobLoop } from "./pieces/google_loginCustomJobLoop.js";
import { google_loginJobLoop } from "./pieces/google_loginJobLoop.js";


export async function DoTheAPIWork(job) {
  // This is an example job that just slowly reports on progress
  // while doing no work. Replace this with your own job logic.
  // in this logic, progress is q percentage number varying between
  // 0 % and 100 %
  //return google_loginJobLoop(job);

  // This is a job that does some AI powered QNA stuff
  // return google_loginAICompletion(job);

  // This is an empty job for you
  return google_loginCustomJobLoop(job);
}
