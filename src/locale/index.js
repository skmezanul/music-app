import Vue from 'vue';
import VueI18n from 'vue-i18n';
import store from '@/store';
import EN from './en';
import DE from './de';
import ES from './es';

Vue.use(VueI18n);

const messages = {
  DE,
  EN,
  ES,
};

// get language from vuex store
const locale = store.getters.getCountry;

/* eslint-disable no-new */
const i18n = new VueI18n({
  locale,
  fallbackLocale: 'EN',
  silentTranslationWarn: true,
  messages,
});

export default i18n;
