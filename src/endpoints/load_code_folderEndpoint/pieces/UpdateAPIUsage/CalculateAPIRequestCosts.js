import { Constants } from "../../../../AppConstants/Constants.js";
import { UseAPICredits } from "../../../../services/UseAPICredits/UseAPICredits.js";



export async function CalculateAPIRequestCosts(job, outputData) {
  // outputData is an object looking like
  // { model_chosen, qty_tokens }


  // the name of the openai model used
  const openai_model_used = outputData.model_chosen;

  // the input/output price per 1000 tokens.
  // { input: number, output: number }
  const modelPrice = Constants.modelsPrices[openai_model_used];

  // the input price, given:
  //
  // The number of input tokens, 
  // as a percentage of what this value 
  // is relative to 1000 tokens....
  // and
  // the price for 1k input tokens
  const percentageInputTokens = ((outputData.qty_tokens / 1000) * 100);
  const priceFor1KInputTokens = modelPrice;
  const outputCostDollar = (percentageInputTokens * priceFor1KInputTokens) / 100;


  // 25 % of the openai cost
  const feeDollar = (outputCostDollar) / 4;

  // the total cost of this API request, in dollars
  // (total price includes the mafia boss fee)
  const totalCostDollar = outputCostDollar + feeDollar;

  // the total cost of the request, translated in API Credits
  // for info, 1 API Credit = 0.001 $
  const totalCostAPICredits = totalCostDollar * 1000;

  // all the costs of the request, in an object.
  // totalCost is what needs to be deducted from the users API Credits.
  // all the costs below are in dollars.
  const usageRecord = {
    totalCostDollar,
    totalCostAPICredits,
  };

  // the cost to deduct from the users API Credits
  const costInCredits = usageRecord.totalCostAPICredits;

  // deduct the cost from the users API Credits
  const newUserBalance = await UseAPICredits(job, costInCredits);

  // store the remaining API credits balance of the user
  usageRecord.APICreditsLeft = newUserBalance;

  return usageRecord;
}
