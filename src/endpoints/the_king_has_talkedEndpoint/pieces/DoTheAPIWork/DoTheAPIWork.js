
import { the_king_has_talkedAICompletion } from "./pieces/the_king_has_talkedAICompletion.js";
import { the_king_has_talkedCustomJobLoop } from "./pieces/the_king_has_talkedCustomJobLoop.js";
import { the_king_has_talkedJobLoop } from "./pieces/the_king_has_talkedJobLoop.js";


export async function DoTheAPIWork(job) {
  // This is an example job that just slowly reports on progress
  // while doing no work. Replace this with your own job logic.
  // in this logic, progress is q percentage number varying between
  // 0 % and 100 %
  return the_king_has_talkedJobLoop(job);

  // This is a job that does some AI powered QNA stuff
  // return the_king_has_talkedAICompletion(job);

  // This is an empty job for you
  //return the_king_has_talkedCustomJobLoop(job);
}
