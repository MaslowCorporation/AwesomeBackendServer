
//import { strings_en } from "./translations/strings_en.js";
/* PLOP_INJECT_IMPORT */

import i18next from 'i18next';

/**
 * AppStrings
 * est une bibliothèque de strings multilingues
 *
 * il faut initialiser cette bibliothèque dans App.js,
 * avec la fonction d'init
 *
 */

// les strings selon pays
const translations = {
  en: {
    translation: {
      /* PLOP_INJECT_SRC_STRING */

      welcome: "Bonjour",
      country: "fr",
      xnPkyJUf: `Je vais t'aider mon chou ! Je vais te donner mon nom:`,
      xJLDlRfb: `Quantité de tokens disponibles pour la réponse de monsieur GPT:`,
      x7CTz5XP: "Traduction d'objet en cours...",
      xWtfTMu: `\nTraduction de texte en cours.... Veuillez patienter svp...\n`,
      x8H4nyVx: `Tentative n°`,
      xlqZy0Sf: `Traduction de texte réussie !`,  

      /* PLOP_INJECT_SRC_END */
    },
  },
  /* PLOP_INJECT_INTL_STRINGS */
  /*"en": {
    translation: strings_en
  },*/
};

function InitAppStrings() {
  //const i18nApp2 = i18next.createInstance();

  i18next.init({
    fallbackLng: 'en',
    resources: translations,
  });

  return i18next;
}

const app_strings = InitAppStrings();

export { InitAppStrings };


