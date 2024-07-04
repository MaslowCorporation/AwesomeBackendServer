/* PLOP_INJECT_IMPORT */

/* PLOP_INJECT_GLOBAL_CODE */

import { get_encoding, encoding_for_model } from "tiktoken";

export function GetPromptTokensLength(openai_model_name, prompt) {
  const enc = encoding_for_model(openai_model_name);

  const qtyTokens = enc.encode(prompt)?.length;

  // don't forget to free the encoder after it is not used
  enc.free();

  return qtyTokens;
}
