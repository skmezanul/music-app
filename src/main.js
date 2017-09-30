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
  render: h => h(app),
});

Vue.prototype.$toTarget = function toTarget(name, id, owner) {
  const target = {
    name,
    params: {
      id,
      owner,
    },
  };
  return target;
};
