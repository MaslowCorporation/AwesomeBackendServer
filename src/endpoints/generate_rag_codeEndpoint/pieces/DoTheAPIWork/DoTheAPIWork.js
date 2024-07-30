
import { generate_rag_codeAICompletion } from "./pieces/generate_rag_codeAICompletion.js";
import { generate_rag_codeCustomJobLoop } from "./pieces/generate_rag_codeCustomJobLoop.js";
import { generate_rag_codeJobLoop } from "./pieces/generate_rag_codeJobLoop.js";


export async function DoTheAPIWork(job) {
  // This is an example job that just slowly reports on progress
  // while doing no work. Replace this with your own job logic.
  // in this logic, progress is q percentage number varying between
  // 0 % and 100 %
  //return generate_rag_codeJobLoop(job);

  // This is a job that does some AI powered QNA stuff
  // return generate_rag_codeAICompletion(job);

  // This is an empty job for you
  return generate_rag_codeCustomJobLoop(job);
}
