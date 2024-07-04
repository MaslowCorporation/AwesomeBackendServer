import { CalculateOpenAICosts } from "../../../../services/CalculateOpenAICosts/CalculateOpenAICosts.js";
import { CalculateAPIRequestCosts } from "./CalculateAPIRequestCosts.js";


export async function UpdateAPIUsage(outputData, job) {
  // outputData is an object looking like
  // { result, inputTokens, outputTokens }
  //
  // job.data contains the inputs you passed to the job.

  // calculate the OPENAI related costs 
  // , and the mafia boss fee ;-)
  // then extract this from the users API Credits.
  //
  // uncomment this if you want 
  // to monetize some OPENAI completion
  // return CalculateOpenAICosts(job, outputData);

  // Implement your own logic , and return a usage object 
  // containing whatever 
  // you deem necessary for your monetization strategy
  // the total cost of the request
  // return CalculateAPIRequestCosts(job);

  // empty shizzle
  return {};
}


