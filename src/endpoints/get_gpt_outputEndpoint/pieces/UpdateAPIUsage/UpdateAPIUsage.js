import { CalculateOpenAICosts } from "../../../../services/CalculateOpenAICosts/CalculateOpenAICosts.js";

export async function UpdateAPIUsage(outputData, job) {
  // outputData is an object looking like
  // { result, inputTokens, outputTokens }
  //
  // job.data contains the inputs you passed to the job.

  // calculate the OPENAI related costs 
  // , and the mafia boss fee ;-)
  // then extract this from the user's API Credits.
  //
  // remove the return {}; line
  // and uncomment this if you want 
  // to monetize some OPENAI completion
  return CalculateOpenAICosts(job, outputData);

  // Implement your own logic , and return a usage object 
  // containing whatever 
  // you deem necessary for your monetization strategy
  // return {};
}


