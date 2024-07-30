
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

    const availableTokens = Math.floor((2 / 3) * model_max_tok);

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

  const openai = new OpenAI({
    apiKey,
  });


  let latest_chunk;

  // Create a chat-based completion request
  const stream = await openai.chat.completions.create({
    model: model_chosen,
    max_tokens: availableTokens,
    messages: [{ role: 'user', content: prompt }],
    stream: true,
    stream_options: { "include_usage": true }
  });



  for await (const chunk of stream) {
    const chunkData = chunk.choices[0]?.delta?.content || '';

    result += chunkData;

    onProgress && onProgress({ chunk: chunkData })

    latest_chunk = chunk;
  }

  const inputTokens = latest_chunk.usage.prompt_tokens;
  const outputTokens = latest_chunk.usage.completion_tokens;

  print && console.log(`Chat Completion Answer: ${result}`);
  print && console.log(`Model chosen: ${model_chosen}`);
  print && console.log("Input tokens: " + inputTokens);
  print && console.log("Output tokens: " + outputTokens);

  return { result, inputTokens, outputTokens }


}


export { GetChatGPTOutput };

