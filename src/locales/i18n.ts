import i18n from 'i18next'
import LanguageDetector from 'i18next-browser-languagedetector'
import { initReactI18next } from 'react-i18next'
import { getCache } from '@/utils/localCache'
import en_US from './lang/en_US'
import zh_CN from './lang/zh_CN'
import { LocalEnum, StorageEnum } from '@/types/enum'

const defaultLng = getCache(StorageEnum.I18N) || (LocalEnum.zh_CN as string)
i18n
  // detect user language
  // learn more: https://github.com/i18next/i18next-browser-languageDetector
  .use(LanguageDetector)
  // pass the i18n instance to react-i18next.
  .use(initReactI18next)
  // init i18next
  // for all options read: https://www.i18next.com/overview/configuration-options
  .init({
    debug: false,
    lng: defaultLng, // localstorage -> i18nextLng: en_US
    fallbackLng: LocalEnum.zh_CN,
    interpolation: {
      escapeValue: false // not needed for react as it escapes by default
    },
    resources: {
      en_US: { translation: en_US },
      zh_CN: { translation: zh_CN }
    }
  })

export default i18n
export const { t } = i18n
