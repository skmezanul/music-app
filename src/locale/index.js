import Vue from 'vue';
import VueI18n from 'vue-i18n';
import translations from './translations';

Vue.use(VueI18n);

/* eslint-disable no-new */

export default new VueI18n({
  locale: 'en',
  translations,
});
