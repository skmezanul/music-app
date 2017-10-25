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
    tablet: '(max-width: 1024px) and (min-width: 768px)',
    desktop: '(min-width: 1024px)',
  },
  render: h => h(app),
});

Vue.prototype.$toRoute = function toTarget(name, params) {
  const target = {
    name,
    params,
  };
  return target;
};

Vue.prototype.$formatValue = function formatValue(value, type) {
  let formattedValue = value;

  if (typeof value === 'number' && type === 'time') {
    // time to human readable
    const minutes = Math.floor(value / 60000);
    const seconds = ((value % 60000) / 1000).toFixed(0);
    formattedValue = `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
  }

  if (typeof value === 'number' && type === 'index') {
    // index to 2 digits
    if (value < 99) {
      formattedValue = String(`0${value + 1}`).slice(-2);
    } else {
      formattedValue = (value + 1);
    }
  }

  if (typeof value === 'string') {
    // remove 'Cover:' from meta
    const exp = /Cover:/;
    if (exp.test(value)) {
      [formattedValue] = value.split('Cover:');
    }
  }

  return formattedValue;
};

Vue.prototype.$includes = function includes(object, query) {
  const exp = new RegExp(query);
  const test = exp.test(object, 'i');
  return test;
};
