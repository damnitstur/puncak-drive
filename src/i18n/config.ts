import i18n from "i18next"
import { initReactI18next } from "react-i18next"
import LanguageDetector from "i18next-browser-languagedetector"

import idTranslation from "./locales/id.json"
import enTranslation from "./locales/en.json"
import arTranslation from "./locales/ar.json"

const resources = {
  id: { translation: idTranslation },
  en: { translation: enTranslation },
  ar: { translation: arTranslation },
}

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources,
    fallbackLng: "id",
    supportedLngs: ["id", "en", "ar"],
    interpolation: {
      escapeValue: false,
    },
    detection: {
      order: ["localStorage", "navigator"],
      caches: ["localStorage"],
    },
  })

// Auto update document direction (RTL for Arabic, LTR for ID/EN)
i18n.on("languageChanged", (lng) => {
  const dir = lng === "ar" ? "rtl" : "ltr"
  document.documentElement.dir = dir
  document.documentElement.lang = lng
})

// Set initial direction
const initialLng = i18n.language || "id"
document.documentElement.dir = initialLng === "ar" ? "rtl" : "ltr"
document.documentElement.lang = initialLng

export default i18n
