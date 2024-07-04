
import { create_arduino_sketchAICompletion } from "./pieces/create_arduino_sketchAICompletion.js";
import { create_arduino_sketchCustomJobLoop } from "./pieces/create_arduino_sketchCustomJobLoop.js";
import { create_arduino_sketchJobLoop } from "./pieces/create_arduino_sketchJobLoop.js";


export async function DoTheAPIWork(job) {
  // This is an example job that just slowly reports on progress
  // while doing no work. Replace this with your own job logic.
  // in this logic, progress is q percentage number varying between
  // 0 % and 100 %
  //return create_arduino_sketchJobLoop(job);

  // This is a job that does some AI powered QNA stuff
  return create_arduino_sketchAICompletion(job);

  // This is an empty job for you
  //return create_arduino_sketchCustomJobLoop(job);
}
