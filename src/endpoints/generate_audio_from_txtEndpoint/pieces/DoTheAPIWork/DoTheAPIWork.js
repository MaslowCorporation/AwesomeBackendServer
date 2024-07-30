
import { generate_audio_from_txtAICompletion } from "./pieces/generate_audio_from_txtAICompletion.js";
import { generate_audio_from_txtCustomJobLoop } from "./pieces/generate_audio_from_txtCustomJobLoop.js";
import { generate_audio_from_txtJobLoop } from "./pieces/generate_audio_from_txtJobLoop.js";


export async function DoTheAPIWork(job) {
  // This is an example job that just slowly reports on progress
  // while doing no work. Replace this with your own job logic.
  // in this logic, progress is q percentage number varying between
  // 0 % and 100 %
  //return generate_audio_from_txtJobLoop(job);

  // This is a job that does some AI powered QNA stuff
  // return generate_audio_from_txtAICompletion(job);

  // This is an empty job for you
  return generate_audio_from_txtCustomJobLoop(job);
}
