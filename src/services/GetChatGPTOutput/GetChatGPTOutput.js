
import { GetPromptTokensLength } from "../GetPromptTokensLength/GetPromptTokensLength.js";

import i18next from "i18next";

import OpenAI from 'openai';

import { Constants } from "../../AppConstants/Constants.js";

async function GetChatGPTOutput({
  model_chosen,
  prompt,
  onSuccess,
  onError,
  onProgress,
  apiKey,
  params,
  print = false,
}) {
  try {


    const model_max_tok = Constants.modelsMaxTokens[model_chosen];

    const prompt_token_length = GetPromptTokensLength(model_chosen, prompt);
    const availableTokens = model_max_tok - prompt_token_length - 100;

    print && console.log(i18next.t("xnPkyJUf") + ` ${model_chosen}`);
    print && console.log(
      i18next.t("xJLDlRfb") +
      ` ${!isNaN(availableTokens) ? availableTokens : "..."}`
    );



    const outputData = await GetTextFromCompletion({
      apiKey,
      model_chosen,
      availableTokens,
      prompt,
      params,
      onProgress,
      print,
    });



    onSuccess && onSuccess(outputData);

    return outputData;

  } catch (error) {


    console.log(`A problem occurred while trying to complete a prompt: ${JSON.stringify(error, null, 2)}`)

    if (error.response) {
      onError && onError(error.response.data);
    } else {
      onError && onError(error.message);
    }

    return null;
  }
}

async function GetTextFromCompletion({
  apiKey,
  model_chosen,
  availableTokens,
  prompt,
  params,
  print,
  onProgress,
}) {
  if (Constants.chatModels.includes(model_chosen)) {
    return GetChatCompletion({
      model_chosen,
      prompt,
      onProgress,
      print,
      apiKey,
      availableTokens,
    });
  } else {
    return null;
  }
}

async function GetChatCompletion({
  model_chosen,
  prompt,
  onProgress,
  print = false,
  apiKey,
  params,
  availableTokens,
}) {


  let result = "";
  const inputTokens = GetPromptTokensLength(model_chosen, prompt);



  // Print model information if enabled
  print && console.log(`Model chosen: ${model_chosen}`);

  const openai = new OpenAI({
    apiKey,
  });

  // Create a chat-based completion request
  const stream = await openai.chat.completions.create({
    model: model_chosen,
    max_tokens: availableTokens,
    messages: [{ role: 'user', content: prompt }],
    stream: true,
  });

  for await (const chunk of stream) {


    const chunkData = chunk.choices[0]?.delta?.content || '';

    result += chunkData;

    onProgress && onProgress({ chunk: chunkData, inputTokens })
  }



  const outputTokens = GetPromptTokensLength(model_chosen, result);

  print && console.log(`Chat Completion Answer: ${result}`);

  return { result, inputTokens, outputTokens }


}


export { GetChatGPTOutput };

