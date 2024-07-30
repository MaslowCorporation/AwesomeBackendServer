import { AddJobInQueue } from "../../../../../BackgroundWorker/AddJobInQueue.js";
import { GetJobQueue } from "../../../../../BackgroundWorker/GetJobQueue.js";
import { GetUniqueID } from "../../../../../services/GetUniqueID/GetUniqueID.js";

export async function generate_rag_codeLongWork(req, res) {
  // the data passed by the API client.
  //
  // If you use Postman, the args are passed in the body,
  // with x-www-form-urlencoded chosen
  //
  // If you use Javascript or other similar languages,
  // its an object passed as the body of some HTTP request code
  // (axios, etc...)
  const { prompt, model_chosen, userId } = req.body;

  // the queue
  let workQueue = GetJobQueue();


  // add id of this job, so we can handle it later
  const jobId = GetUniqueID(15);

  // the name of the endpoint thats about to add a job in the queue.
  // so we know what work needs to be done in the background
  const api_endpoint_name = "generate_rag_code";

  // add a background job in a BullMQ Queue
  await AddJobInQueue({
    workQueue,
    jobId,
    api_endpoint_name,
    req,
    res,
    args: {

      // these are the args used during A.I. Chat Completion.
      prompt,
      model_chosen,
      userId
    }
  });
}
