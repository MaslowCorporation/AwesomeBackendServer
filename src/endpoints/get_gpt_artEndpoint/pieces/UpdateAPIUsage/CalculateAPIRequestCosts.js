import { Constants } from "../../../../AppConstants/Constants.js";
import { UseAPICredits } from "../../../../services/UseAPICredits/UseAPICredits.js";



export async function CalculateAPIRequestCosts(job) {
   // the name of the openai model used
  const openai_model_used = job.data?.model_chosen;

  // the input/output price per 1000 tokens.
  // { input: number, output: number }
  const modelPrices = Constants.modelsPrices[openai_model_used];

  // the total cost of this API request, in dollars
  const photoCostDollar = modelPrices.output[`width${job.data.img_width}`];
  const feeDollar = photoCostDollar / 4;

  const totalCostDollar = photoCostDollar + feeDollar;

  // the total cost of the request, translated in API Credits
  // for info, 1 API Credit = 0.001 $
  const totalCostAPICredits = totalCostDollar * 1000;

  // all the costs of the request, in an object.
  // totalCost is what needs to be deducted from the user's API Credits.
  // all the costs below are in dollars.
  const usageRecord = {
    photoCostDollar,
    feeDollar,
    totalCostDollar,
    totalCostAPICredits,
  };

  // the cost to deduct from the users API Credits
  const costInCredits = usageRecord.totalCostAPICredits;

  // deduct the cost from the user's API Credits
  const newUserBalance = await UseAPICredits(job, costInCredits);

  // store the remaining API credits balance of the user
  usageRecord.APICreditsLeft = newUserBalance;

  return usageRecord;
}
