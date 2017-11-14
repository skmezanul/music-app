import Vue from 'vue';
import VueI18n from 'vue-i18n';
import store from '@/store';
import DE from './de';
import EN from './en';
import ES from './es';

Vue.use(VueI18n);

let locale;

if (typeof store.getters.getCountry !== 'undefined') {
  // set language
  switch (store.getters.getCountry) {
    case 'DE':
      locale = 'DE';
      break;
    case 'EN':
    default:
      locale = 'EN';
      break;
    case 'ES':
      locale = 'ES';
      break;
  }
  // set html lang attribute to current language
  document.documentElement.lang = locale;
}

const messages = {
  DE,
  EN,
  ES,
};

/* eslint-disable no-new */
const i18n = new VueI18n({
  locale,
  fallbackLocale: 'EN',
  silentTranslationWarn: true,
  messages,
});

export default i18n;
