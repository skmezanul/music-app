import Vue from 'vue';
import VueI18n from 'vue-i18n';
import './api';
import './components';
import app from './app.vue';
import store from './store';
import router from './router';

Vue.config.productionTip = false;

/* eslint-disable no-new */
const i18n = new VueI18n({
  locale: 'en',
});

new Vue({
  el: '#app',
  router,
  store,
  i18n,
  render: h => h(app),
});
