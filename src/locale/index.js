import Vue from 'vue';
import VueI18n from 'vue-i18n';
import EN from './en';
import DE from './de';
import ES from './es';

Vue.use(VueI18n);

const messages = {
  DE,
  EN,
  ES,
};

// get language from local storage
const locale = localStorage.getItem('app_language');

/* eslint-disable no-new */
const i18n = new VueI18n({
  locale,
  fallbackLocale: 'EN',
  silentTranslationWarn: true,
  messages,
});

export default i18n;
