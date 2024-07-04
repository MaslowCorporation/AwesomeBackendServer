import Queue from 'bull';

let workQueue;

export function GetJobQueue() {
  // the redis server address
  if (!workQueue) {
    // REDISCLOUD_URL is for Heroku (Redis Cloud add-on)
    // REDIS_URL is for RailWay (Redis Service)
    // 'redis://127.0.0.1:6379' is for local testing via npm run start-server-unix or start-server-win10
    let REDIS_URL = process.env.REDISCLOUD_URL || process.env.REDIS_URL || 'redis://127.0.0.1:6379';

    console.log("LET'S CREATE A NEW WORK QUEUE ! ZE REDIS URL = " + REDIS_URL)

    // Create / Connect to a queue named "work"
    workQueue = new Queue('long_http_request_endpoint', REDIS_URL);

    return workQueue;
  } else {
    console.log(`A work queue already exists, return this one`);
    return workQueue;
  }
}
