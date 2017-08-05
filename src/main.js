import Vue from 'vue';
import './components';
import './api/api.js';
import app from './app.vue';
import store from './store';
import router from './router';

Vue.config.productionTip = false;

/* eslint-disable no-new */

new Vue({
  el: '#app',
  router,
  store,
  render: h => h(app),
});
