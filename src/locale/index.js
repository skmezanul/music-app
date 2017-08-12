import Vue from 'vue';
import VueI18n from 'vue-i18n';
import translations from './translations';

Vue.use(VueI18n);

/* eslint-disable no-new */

const i18n = new VueI18n({
  locale: 'en',
  translations,
});

export default i18n;
