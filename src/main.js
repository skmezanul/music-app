import Vue from 'vue';
import i18n from './locale';
import store from './store';
import router from './router';
import './api';
import './components';
import app from './app.vue';

Vue.config.productionTip = false;

/* eslint-disable no-new */

new Vue({
  el: '#app',
  router,
  store,
  i18n,
  render: h => h(app),
});
