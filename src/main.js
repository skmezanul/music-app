import Vue from 'vue';
import i18n from './locale';
import store from './store';
import router from './router';
import './api';
import './components';
import app from './app';

/* eslint-disable no-new */
new Vue({
  el: '#app',
  i18n,
  router,
  store,
  mq: {
    phone: '(max-width: 768px)',
    tablet: '(max-width: 1024px) and (min-width: 769px)',
    desktop: '(min-width: 1025px)',
  },
  render: h => h(app),
});
