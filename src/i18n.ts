import en from '@/locales/en/common.json'
import vi from '@/locales/vi/common.json'
import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'

i18n.use(initReactI18next).init({
  interpolation: { escapeValue: false },
  lng: 'vi',
  resources: {
    en: {
      common: en,
    },
    vi: {
      common: vi,
    },
  },
})
export default i18n
