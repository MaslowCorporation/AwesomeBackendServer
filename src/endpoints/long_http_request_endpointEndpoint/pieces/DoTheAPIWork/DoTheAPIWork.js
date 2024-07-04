
import { long_http_request_endpointJobLoop } from "./pieces/long_http_request_endpointJobLoop.js";


export async function DoTheAPIWork(job) {
  // This is an example job that just slowly reports on progress
  // while doing no work. Replace this with your own job logic.
  // in this logic, progress is q percentage number varying between
  // 0 % and 100 %
  return long_http_request_endpointJobLoop(job);
}
