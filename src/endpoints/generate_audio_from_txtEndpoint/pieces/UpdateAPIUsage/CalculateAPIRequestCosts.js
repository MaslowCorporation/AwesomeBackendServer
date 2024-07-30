import { Constants } from "../../../../AppConstants/Constants.js";
import { CountCharacters } from "../../../../services/CountCharacters/CountCharacters.js";
import { UseAPICredits } from "../../../../services/UseAPICredits/UseAPICredits.js";



export async function CalculateAPIRequestCosts(job) {
  // the amount of characters in the input string
  const charQty = CountCharacters(job.data.text);

  // the price per thousand characters and for 1 character
  const priceFor1KChars = Constants.modelsPrices["tts-1"];
  const priceFor1Char = priceFor1KChars / 1000;

  // the request's price
  const requestPrice = charQty * priceFor1Char;

  // the fee (50% of the price of the request price)
  const feePrice = requestPrice / 2;

  // the total price
  const totalCost = requestPrice + feePrice;

  // the total cost of the request, translated in API Credits
  // for info, 1 API Credit = 0.001 $
  const totalCostAPICredits = totalCost * 1000;

  // all the costs of the request, in an object.
  // totalCost is what needs to be deducted from the users API Credits.
  // all the costs below are in dollars.
  const usageRecord = {
    totalCost,
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
