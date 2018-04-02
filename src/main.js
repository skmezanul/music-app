import Vue from 'vue';

import lazyload from 'vue-lazyload';
import parallax from 'vue-parallax-js';
import modals from 'vue-js-modal';
import tooltip from 'v-tooltip';

import 'material-design-icons/iconfont/material-icons.css';

import i18n from './locale';
import store from './store';
import router from './router';
import './api';
import './components';
import app from './app';

// register plugins
Vue.use(lazyload);
Vue.use(parallax);
Vue.use(modals, { componentName: 'ma-modal' });
Vue.use(tooltip, {
  defaultClass: '',
  /* eslint-disable max-len */
  defaultTemplate: '<div class="c-tooltips__single" role="tooltip"><div class="c-tooltips__inner"></div></div>',
  defaultContainer: '.c-tooltips',
  defaultInnerSelector: '.c-tooltips__inner',
});

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
