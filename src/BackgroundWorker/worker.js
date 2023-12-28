import throng from 'throng';
import redisUrlParse from 'redis-url-parse';
import { GetJobQueue } from './GetJobQueue.js';

// PLOP_INJECT_ENDPOINT_JOB_IMPORT





// Spin up multiple processes to handle jobs to take advantage of more CPU cores
// See: https://devcenter.heroku.com/articles/node-concurrency for more info
let workers = process.env.WEB_CONCURRENCY || 2;

// The maximum number of jobs each worker should process at once. This will need
// to be tuned for your application. If each job is mostly waiting on network 
// responses it can be much higher. If each job is CPU-intensive, it might need
// to be much lower.
let maxJobsPerWorker = 50;


/**
 * Start the job.
 */
function start() {

  const workQueue = GetJobQueue();

  // Initialize BullMQ Queue and other components
  workQueue.process(maxJobsPerWorker, async (job) => {
    let output;

    switch (job.data.api_endpoint_name) {
      // PLOP_INJECT_ENDPOINT_JOB_CASE


      case "some_stupid_placeholder":
        // do something
        output = null;

        break;
      default:
        throw new Error(`Unknown API endpoint: ${job.data.api_endpoint_name}`);
    }

    return output;
  });


}

// Initialize the clustered worker process
// See: https://devcenter.heroku.com/articles/node-concurrency for more info
throng({ workers, start })
