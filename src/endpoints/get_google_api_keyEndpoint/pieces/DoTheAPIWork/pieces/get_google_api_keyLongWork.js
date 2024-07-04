import { AddJobInQueue } from "../../../../../BackgroundWorker/AddJobInQueue.js";
import { GetJobQueue } from "../../../../../BackgroundWorker/GetJobQueue.js";
import { GetUniqueID } from "../../../../../services/GetUniqueID/GetUniqueID.js";

export async function get_google_api_keyLongWork(req, res) {
  // the data passed by the API client.
  //
  // If you use Postman, the args are passed in the body,
  // with x-www-form-urlencoded chosen
  //
  // If you use Javascript or other similar languages,
  // it's an object passed as the body of some HTTP request code
  // (axios, etc...)
  const { prompt, params, model_chosen, test_timer_duration } = req.body;

  // the queue
  let workQueue = GetJobQueue();


  // add id of this job, so we can handle it later
  const jobId = GetUniqueID(15);

  // the name of the endpoint that's about to add a job in the queue.
  // so we know what work needs to be done in the background
  const api_endpoint_name = "get_google_api_key";

  // add a background job in a BullMQ Queue
  await AddJobInQueue({
    workQueue,
    jobId,
    api_endpoint_name,
    req,
    res,
    args: {
      // for the example code, 
      // you need to input the total duration of the timer, 
      // in milliseconds.
      // This can be erased when you will need to add your own stuff.
      timer_duration: test_timer_duration,

      // these are the args used during A.I. Chat Completion.
      prompt, 
      params, 
      model_chosen,
    }
  });
}
