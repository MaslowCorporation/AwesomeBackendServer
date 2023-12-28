import { Constants } from "../../AppConstants/Constants.js";
import { UseAPICredits } from "../UseAPICredits/UseAPICredits.js";

/**
 *
 * @param {*} job
 * @param {*} outputData
 *
 * @returns
 */
export async function CalculateOpenAICosts(job, outputData) {
  // the name of the openai model used
  const openai_model_used = job.data?.model_chosen;

  // the input/output price per 1000 tokens.
  // { input: number, output: number }
  const modelPrices = Constants.modelsPrices[openai_model_used];

  // the input price, given:
  //
  // The number of input tokens, 
  // as a percentage of what this value 
  // is relative to 1000 tokens....
  // and
  // the price for 1k input tokens
  const percentageInputTokens = ((outputData.inputTokens / 1000) * 100);
  const priceFor1KInputTokens = modelPrices.input;
  const inputCostDollar = (percentageInputTokens * priceFor1KInputTokens) / 100;

  /*
  console.log(`
${outputData.inputTokens} tokens is ${percentageInputTokens} % of 1000 tokens,
so given a price of ${priceFor1KInputTokens} $ per 1K tokens,
${percentageInputTokens} % of ${priceFor1KInputTokens} = ${inputCost}`
  );
  */

  // the output price, given:
  //
  // The number of output tokens, 
  // as a percentage of what this value 
  // is relative to 1000 tokens....
  // and
  // the price for 1k output tokens
  const percentageOutputTokens = ((outputData.outputTokens / 1000) * 100);
  const priceFor1KOutputTokens = modelPrices.output;
  const outputCostDollar = (percentageOutputTokens * priceFor1KOutputTokens) / 100;

  /*
  console.log(`
${outputData.outputTokens} tokens is ${percentageOutputTokens} % of 1000 tokens,
so given a price of ${priceFor1KOutputTokens} $ per 1K tokens,
${percentageOutputTokens} % of ${priceFor1KOutputTokens} = ${outputCost}`
  );
  */

  // 25 % of the openai cost
  const feeDollar = (inputCostDollar + outputCostDollar) / 4;

  // the total cost of the request
  const totalCostDollar = inputCostDollar + outputCostDollar + feeDollar;

  // the total cost of the request, translated in API Credits
  // for info, 1 API Credit = 0.001 $
  const totalCostAPICredits = totalCostDollar * 1000;

  // all the costs of the request, in an object.
  // totalCost is what needs to be deducted from the user's API Credits.
  // all the costs below are in dollars.
  let usageRecord = {
    inputCostDollar,
    outputCostDollar,
    feeDollar,
    totalCostDollar,
    totalCostAPICredits,
  };

  // the cost to deduct from the users API Credits
  const costInCredits = usageRecord.totalCostAPICredits;

  // deduct the cost from the user's API Credits
  const newUserBalance = await UseAPICredits(job, costInCredits);

  usageRecord.APICreditsLeft = newUserBalance;

  return usageRecord;
}


