import 'dotenv/config';

import throng from 'throng';


// PLOP_INJECT_ENDPOINT_JOB_IMPORT

import { generate_rag_codeJob } from '../endpoints/generate_rag_codeEndpoint/pieces/DoTheAPIWork/pieces/generate_rag_codeJob.js';

import { load_code_folderJob } from '../endpoints/load_code_folderEndpoint/pieces/DoTheAPIWork/pieces/load_code_folderJob.js';

import { generate_audio_from_txtJob } from '../endpoints/generate_audio_from_txtEndpoint/pieces/DoTheAPIWork/pieces/generate_audio_from_txtJob.js';

import { the_king_has_talkedJob } from '../endpoints/the_king_has_talkedEndpoint/pieces/DoTheAPIWork/pieces/the_king_has_talkedJob.js';

import { google_loginJob } from '../endpoints/google_loginEndpoint/pieces/DoTheAPIWork/pieces/google_loginJob.js';

import { get_google_api_keyJob } from '../endpoints/get_google_api_keyEndpoint/pieces/DoTheAPIWork/pieces/get_google_api_keyJob.js';

import { transform_file_cloudJob } from '../endpoints/transform_file_cloudEndpoint/pieces/DoTheAPIWork/pieces/transform_file_cloudJob.js';

import { delete_file_cloudJob } from '../endpoints/delete_file_cloudEndpoint/pieces/DoTheAPIWork/pieces/delete_file_cloudJob.js';

import { upload_file_cloudJob } from '../endpoints/upload_file_cloudEndpoint/pieces/DoTheAPIWork/pieces/upload_file_cloudJob.js';

import { translate_txtJob } from '../endpoints/translate_txtEndpoint/pieces/DoTheAPIWork/pieces/translate_txtJob.js';

import { get_gpt_funcJob } from '../endpoints/get_gpt_funcEndpoint/pieces/DoTheAPIWork/pieces/get_gpt_funcJob.js';

import { get_gpt_artJob } from '../endpoints/get_gpt_artEndpoint/pieces/DoTheAPIWork/pieces/get_gpt_artJob.js';

import { create_arduino_sketchJob } from '../endpoints/create_arduino_sketchEndpoint/pieces/DoTheAPIWork/pieces/create_arduino_sketchJob.js';

import { compile_arduino_sketchJob } from '../endpoints/compile_arduino_sketchEndpoint/pieces/DoTheAPIWork/pieces/compile_arduino_sketchJob.js';

import { long_http_request_endpointJob } from '../endpoints/long_http_request_endpointEndpoint/pieces/DoTheAPIWork/pieces/long_http_request_endpointJob.js';


import { GetJobQueue } from './GetJobQueue.js';
import { GateKeepJobExecution } from './GateKeepJobExecution.js';

// an array of ids, for gatekeeping
export let allJobsSoFar = [];

// Spin up multiple processes to handle jobs to take advantage of more CPU cores
// See: https://devcenter.heroku.com/articles/node-concurrency for more info
let workers = process.env.WEB_CONCURRENCY || 2;

// The maximum number of jobs each worker should process at once. This will need
// to be tuned for your application. If each job is mostly waiting on network 
// responses it can be much higher. If each job is CPU-intensive, it might need
// to be much lower.
let maxJobsPerWorker = 100;


/**
 * Start the job.
 */
function start() {

  console.log(`Qty Bull Workers: ${workers} , Max. num of job per worker: ${maxJobsPerWorker}`)

  const workQueue = GetJobQueue();

  // Initialize BullMQ Queue and other components
  workQueue.process(maxJobsPerWorker, async (job) => {
    let output;




    // if this job is a first timer, run the job.
    // otherwise don't run it
    const shallWeBegin = await GateKeepJobExecution(job);

    if (!shallWeBegin) {
      return;
    }

    switch (job.data.api_endpoint_name) {
      // PLOP_INJECT_ENDPOINT_JOB_CASE
      case "generate_rag_code":
        // do something
        output = generate_rag_codeJob(job);
        break;
      case "load_code_folder":
        // do something
        output = load_code_folderJob(job);
        break;
      case "generate_audio_from_txt":
        // do something
        output = generate_audio_from_txtJob(job);
        break;
      case "the_king_has_talked":
        // do something
        output = the_king_has_talkedJob(job);
        break;
      case "google_login":
        // do something
        output = google_loginJob(job);
        break;
      case "get_google_api_key":
        // do something
        output = get_google_api_keyJob(job);
        break;
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
      case "long_http_request_endpoint":
        // do something
        output = long_http_request_endpointJob(job);

        break;
      default:
        throw new Error(`Unknown API endpoint: ${job.data.api_endpoint_name}`);
    }

    const graal = await output;

    console.log(`Job ${job.id} ran through successfully !`);
    // console.log(`Here's the output: ${JSON.stringify(graal, null, 2)}`);

    return output;
  });


}

// Initialize the clustered worker process
// See: https://devcenter.heroku.com/articles/node-concurrency for more info
throng({
  workers,
  start,
})
