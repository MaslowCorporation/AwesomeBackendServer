import { UpdateAPIUsage } from "../../UpdateAPIUsage/UpdateAPIUsage.js";
import { DoTheAPIWork } from "../DoTheAPIWork.js";

export async function transform_file_cloudJob(job) {
  console.log(`Job loop "transform_file_cloud" has just started !`);

  // do the main API work here.
  // chunked file upload ? AI Chat Completion ? Here you go !
  const outputData = await DoTheAPIWork(job);

  // Here you update API usage stuff, if needed
  // If you choose to monetize this API
  const record = await UpdateAPIUsage(outputData, job);

  // return the final output, the fruit of your labor,
  // the graal, the caviar, the og kush, here you go !
  return { answer: outputData, usage: record };

  
}


