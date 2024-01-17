/* PLOP_INJECT_IMPORT */
//import React from "react";

// ADD_NEW_AI_MODEL
const chatModels = ["gpt-4-1106-preview", "gpt-4", "gpt-3.5-turbo", "gpt-3.5-turbo-16k", "gpt-3.5-turbo-1106"];
const completionModels = [];

/**
 * Ici, on stocke les constantes utiles dans notre template de question
 */
const Constants = {
  true: 1,
  false: 0,

  completionModels: completionModels,

  chatModels: chatModels,

  allModels: completionModels.concat(chatModels),

  // ADD_NEW_AI_MODEL
  modelsMaxTokens: {
    "gpt-4-1106-preview": 4096,
    "gpt-4": 8192,
    "gpt-4-32k": 16394,
    "gpt-3.5-turbo": 4096,
    "gpt-3.5-turbo-16k": 16385,
    "gpt-3.5-turbo-1106": 4096
  },

  // ADD_NEW_AI_MODEL
  // prices per 1000 tokens
  modelsPrices: {
    "gpt-4-1106-preview": {
      input: 0.01,
      output: 0.03
    },
    "gpt-4": {
      input: 0.03,
      output: 0.06
    },
    "gpt-4-32k": {
      input: 0.06,
      output: 0.12
    },
    "gpt-3.5-turbo": {
      input: 0.0015,
      output: 0.002
    },
    "gpt-3.5-turbo-16k": {
      input: 0.0015,
      output: 0.002
    },
    "gpt-3.5-turbo-1106": {
      input: 0.0015,
      output: 0.002
    },
    "dall-e-2": {
      output: {
        width256: 0.016,
        width512: 0.018,
        width1024: 0.02,
      }
    }
  },

  exts: [".js", ".ts", ".jsx", ".tsx"],
  ignoreList: ["node_modules", ".git", ".svn", ".hg", ".idea"],
  only_first: "only-first",
  maxChoices: 50,
  pathAbsolu: "Path absolu",
  pathRelatif: "Path relatif",
  returnLine: "Avec ligne return",
  noReturnLine: "Sans ligne return",
  yes: "Oui",
  no: "Non",
  regeneration_command: `npx maslow regen-ai-func`,

};

export { Constants };
