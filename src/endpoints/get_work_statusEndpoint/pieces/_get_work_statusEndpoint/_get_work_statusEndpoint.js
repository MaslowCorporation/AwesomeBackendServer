import { GetJobByID } from "../../../../BackgroundWorker/GetJobByID.js";
import { GetJobQueue } from "../../../../BackgroundWorker/GetJobQueue.js";


export async function _get_work_statusEndpoint(req, res, stripe) {
  // the queue
  let workQueue = GetJobQueue();

  await GetJobByID({ req, res, workQueue });

  return;
}
