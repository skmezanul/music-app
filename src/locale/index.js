/* eslint-disable one-var */
import Vue from 'vue';
import VueI18n from 'vue-i18n';
import store from '@/store';
import DE from './de';
import EN from './en';
import ES from './es';

Vue.use(VueI18n);

const country = store.getters.getCountry;
let locale = 'EN';

if (typeof country !== 'undefined') {
  // set language
  switch (country) {
    case 'DE':
      locale = 'DE';
      break;
    case 'ES':
      locale = 'ES';
      break;
    default:
  }
  // set html lang attribute to current language
  document.documentElement.lang = locale.toLowerCase();
}

const messages = {
  DE,
  EN,
  ES,
};

const i18n = new VueI18n({
  locale,
  fallbackLocale: 'EN',
  silentTranslationWarn: true,
  messages,
});

export default i18n;
