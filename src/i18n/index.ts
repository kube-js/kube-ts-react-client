import i18n from "i18next";
import LanguageDetector from "i18next-browser-languagedetector";
import { initReactI18next } from "react-i18next";
import enGB from './translations/enGB';
import plPl from './translations/plPL';

const resources = {
  'en-GB': {
    translations: enGB,
  },
  'pl-PL': {
    translations: plPl,
  },
};

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    debug: true,
    defaultNS: "translations",
    detection: {
      lookupQuerystring: 'lang',
      order: ['querystring', 'localStorage', 'navigator'],
    },
    fallbackLng: "en-GB",
    interpolation: {
      // React already does escaping
      escapeValue: false,
    },
    ns: ["translations"],
    react: {
      wait: true,
    },
    resources,
  });

export default i18n;
