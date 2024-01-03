import throng from 'throng';
import Queue from 'bull';

// PLOP_INJECT_ENDPOINT_JOB_IMPORT

import { transform_file_cloudJob } from '../endpoints/transform_file_cloudEndpoint/pieces/DoTheAPIWork/pieces/transform_file_cloudJob.js';

import { delete_file_cloudJob } from '../endpoints/delete_file_cloudEndpoint/pieces/DoTheAPIWork/pieces/delete_file_cloudJob.js';

import { upload_file_cloudJob } from '../endpoints/upload_file_cloudEndpoint/pieces/DoTheAPIWork/pieces/upload_file_cloudJob.js';

import { translate_txtJob } from '../endpoints/translate_txtEndpoint/pieces/DoTheAPIWork/pieces/translate_txtJob.js';

import { get_gpt_funcJob } from '../endpoints/get_gpt_funcEndpoint/pieces/DoTheAPIWork/pieces/get_gpt_funcJob.js';

import { get_gpt_artJob } from '../endpoints/get_gpt_artEndpoint/pieces/DoTheAPIWork/pieces/get_gpt_artJob.js';

import { create_arduino_sketchJob } from '../endpoints/create_arduino_sketchEndpoint/pieces/DoTheAPIWork/pieces/create_arduino_sketchJob.js';

import { compile_arduino_sketchJob } from '../endpoints/compile_arduino_sketchEndpoint/pieces/DoTheAPIWork/pieces/compile_arduino_sketchJob.js';

import { get_gpt_outputJob } from '../endpoints/get_gpt_outputEndpoint/pieces/DoTheAPIWork/pieces/get_gpt_outputJob.js';

import { long_http_request_endpointJob } from '../endpoints/long_http_request_endpointEndpoint/pieces/DoTheAPIWork/pieces/long_http_request_endpointJob.js';

import redisUrlParse from 'redis-url-parse';
import { GetJobQueue } from './GetJobQueue.js';

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
      case "transform_file_cloud":
        // do something
        output = transform_file_cloudJob(job);
        break;
      case "delete_file_cloud":
        // do something
        output = delete_file_cloudJob(job);
        break;
      case "upload_file_cloud":
        // do something
        output = upload_file_cloudJob(job);
        break;
      case "translate_txt":
        // do something
        output = translate_txtJob(job);
        break;
      case "get_gpt_func":
        // do something
        output = get_gpt_funcJob(job);
        break;
      case "get_gpt_art":
        // do something
        output = get_gpt_artJob(job);
        break;
      case "create_arduino_sketch":
        // do something
        output = create_arduino_sketchJob(job);
        break;
      case "compile_arduino_sketch":
        // do something
        output = compile_arduino_sketchJob(job);
        break;
      case "get_gpt_output":
        // do something
        output = get_gpt_outputJob(job);
        break;

      case "long_http_request_endpoint":
        // do something
        output = long_http_request_endpointJob(job);

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
