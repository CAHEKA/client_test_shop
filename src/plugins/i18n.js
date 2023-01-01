import Vue from "vue"
import VueI18n from "vue-i18n"
import ruRU from '../localizations/ruRU.json'
import enUS from '../localizations/enUS.json'

Vue.use(VueI18n) // you must specify '{ bridge: true }' plugin option when install vue-i18n

export const i18n = new VueI18n({
    locale: 'ru',
    fallbackLocale: 'en',
    messages: {
      en: enUS,
      ru: ruRU
    }
  }, VueI18n)