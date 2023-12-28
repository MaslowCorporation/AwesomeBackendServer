import i18next from 'i18next';

import { Constants } from "../../AppConstants/Constants.js";
import { GetPromptTokensLength } from "../GetPromptTokensLength/GetPromptTokensLength.js";
import OpenAI from 'openai';


async function GetChatGPTArt({
  model_chosen = "dall-e-2",
  prompt,
  onSuccess,
  onError,
  apiKey,
  img_width,
  img_height,
  print = true,
}) {
  try {
    let image_url;

    if (model_chosen == "dall-e-2") {
      image_url = await GetArtFromDallE(apiKey, prompt, model_chosen, img_width, img_height);
    } 

    if (image_url) {
      onSuccess ? onSuccess(image_url) : 42;

      return image_url;
    }
      
    throw new Error(`GPT Art Request failed`);
    
  } catch (error) {
    
    
    if (error.response) {
      onError != null ? onError(error.response.data) : 42;
    } else {
      onError != null ? onError(error.message) : 42;
    }

    return null;
  }
}

async function GetArtFromDallE(apiKey, prompt, model_chosen, img_width, img_height) {

  const openai = new OpenAI({
    apiKey,
  });
  const response = await openai.images.generate({
    prompt,
    n: 1,
    size: `${img_width}x${img_height}`,
    model: model_chosen
  });

  

  const image_url = response?.data[0]?.url;
  return image_url;
}

export { GetChatGPTArt };
