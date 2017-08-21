import Vue from 'vue';
import VueI18n from 'vue-i18n';
import messages from './translations';

Vue.use(VueI18n);

/* eslint-disable no-new */

export default new VueI18n({
  locale: 'EN',
  fallbackLocale: 'EN',
  messages,
});
