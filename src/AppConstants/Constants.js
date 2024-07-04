/* PLOP_INJECT_IMPORT */
//import React from "react";

// ADD_NEW_AI_MODEL
const chatModels = ["gpt-4", "gpt-3.5-turbo", "gpt-4-turbo", "gpt-4o"];

/**
 * Ici, on stocke les constantes utiles dans notre template de question
 */
const Constants = {
  true: 1,
  false: 0,


  chatModels: chatModels,

  allModels: chatModels,

  // See https://openai.com/api/pricing/
  // and
  // https://platform.openai.com/docs/models/
  // for more info ;-)

  // ADD_NEW_AI_MODEL
  modelsMaxTokens: {
    "gpt-4": 8192,
    "gpt-3.5-turbo": 4096,
    "gpt-4-turbo": 4096,
    "gpt-4o": 4096,
  },

  // ADD_NEW_AI_MODEL
  // prices per 1000 tokens
  modelsPrices: {
    "gpt-4": {
      input: 0.03,
      output: 0.06
    },
    "gpt-3.5-turbo": {
      input: 0.0005,
      output: 0.0015
    },
    "gpt-4-turbo": {
      input: 0.01,
      output: 0.03
    },
    "gpt-4o": {
      input: 0.005,
      output: 0.015
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

  apiErrorCodes: {
    400: "SOME_SERVER_PROBLEM",
    410: "NO_API_KEY_GIVEN",
    411: "UNKNOWN_API_KEY_GIVEN",
    412: "UNKNOWN_GOOGLE_USER_IN_DATABASE",
    413: "API_ACCOUNT_INACTIVE",
    414: "API_CREDITS_EMPTY",
    415: "KING_API_KEY_INACTIVE",
    416: "KING_API_KEY_INVALID",
    417: "GOOGLE_USER_UID_MISSING",
    418: "GOOGLE_USER_EMAIL_MISSING",
    419: "GOOGLE_USER_UID_INVALID",
    420: "NO_FILE_UPLOADED",
    421: "UPLOAD_FAILED",
    422: "WEBHOOK_SIG_VERIF_FAILED",
    423: "UNKNOWN_BULLMQ_JOB"
  }


};

export { Constants };

