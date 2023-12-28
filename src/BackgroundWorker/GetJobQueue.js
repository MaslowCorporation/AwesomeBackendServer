import Queue from 'bull';

export function GetJobQueue() {
  // the redis server address
  let REDIS_URL = process.env.REDIS_URL || 'redis://127.0.0.1:6379';

  // Create / Connect to a queue named "work"
  let workQueue = new Queue('long_http_request_endpoint', REDIS_URL);

  return workQueue;
}
