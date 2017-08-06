import Vue from 'vue';
import './api';
import './components';
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
