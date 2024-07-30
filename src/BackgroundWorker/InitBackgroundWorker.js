import { getNPMFolderRoot } from '../../getNPMFolderRoot.js';
import { GetUniqueID } from '../services/GetUniqueID/GetUniqueID.js';
import { AddJobInQueue } from './AddJobInQueue.js';
import { GetJobQueue } from './GetJobQueue.js';

export async function InitBackgroundWorker(app) {
  // the queue
  let workQueue = GetJobQueue();

  // You can uncomment this line of you want to delete all the jobs in the queue
  //await workQueue.obliterate();

  // during debug, can be used to know how many jobs are in the queue
  const allJobs = await workQueue.getJobs();
  console.log(`\nThere are ${allJobs?.length} jobs in the queue.`);

  // You can listen to global events to get notified when jobs are processed
  workQueue.on('global:completed', (jobId, result) => {
    console.log(`Job with id ${jobId} completed with result ${result}`);


  });
}



