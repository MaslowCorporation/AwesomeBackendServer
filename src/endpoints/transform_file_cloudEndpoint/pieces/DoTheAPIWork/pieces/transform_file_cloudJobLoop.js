import { GetJobQueue } from "../../../../../BackgroundWorker/GetJobQueue.js";
import { Delay } from "../../../../../services/Delay/Delay.js";
import { CancelJobIfNeeded } from "./CancelJobIfNeeded.js";

/**
 * 
 * @param {*} job 
 * 
 * @returns a dummy timer
 */
export async function transform_file_cloudJobLoop(job) {
  /**
   * Below is some example timer code.
   * 
   * You can delete it all, and implement your own thing.
   * 
   * Some useful info:
   * 
   * - job.data contains the args 
   * you have passed in the transform_file_cloudLongWork.js file.
   * 
   * 
   * - job.progress() is a method that allows you to save serializable progress data
   * that the user can get using the get_work_status endpoint.
   * 
   * 
   */

  // the queue
  let workQueue = GetJobQueue();

  // on commence a 0%.
  let progress = 0;

  // This contains the job's data. 
  // The initial stuff the job uses to do it's thing.

  let initialData = job.data;

  // the condition that keeps the work loop going
  let workDone = false;

  // you can use this in case of some job that progress through time
  // like a chunked upload, or other shizzle.
  // This example code can be summarized as this:
  //
  // As long as the work hasn't reached 100% completion....
  while (!workDone) {
    // Here is typically where you implement your own logic
    // (chunked file upload, A.I. chat completion, etc..., whatever....)
    //
    // Is this example, we wait for 1 % of the duration 
    // the user wants his countdown to last
    await Delay(job.data.timer_duration / 100);

    // update the progress by 1%
    progress += 1;

    // update the job's progress,
    // if you need to store intermediate data
    // for your frontend, like a message of patience, or whatever ;-)
    job.progress({
      progress,
      msg: `You are at ${progress} % of the timer loop !`
    });

    // this is a crude implementation of 
    // a cancel feature.
    //
    // to test this, use the UpdateWorkData method, 
    // or the update_work_data endpoint,
    // and set the cancel property to true.
    await CancelJobIfNeeded(workQueue, job);

    // when we reach 100%, we stop the shizzle
    if (progress == 100) {
      workDone = true;
    }

    // if you want to test error handling, you can uncomment this code
    /*
    if (progress > 50) {
      throw new Error("This job failed!")
    }
    */
  }

  // here, you would typically implement your own API monetization logic
  // if needed. Use the UpdateAPIUsage method located 
  // in your endpoint folder somewhere
  //await UpdateAPIUsage();

  // A job can return values that will be stored in Redis as JSON
  // This return value is unused in this demo application.
  return { value: "This is the output" };
}


