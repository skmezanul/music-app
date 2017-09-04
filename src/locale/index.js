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

/* eslint-disable no-new */

export default new VueI18n({
  locale: localStorage.getItem('app_language'),
  fallbackLocale: 'EN',
  silentTranslationWarn: true,
  messages,
});
