/* eslint-disable no-new, max-len */
import Vue from 'vue';

import 'material-design-icons/iconfont/material-icons.css';

// import plugins
import lazyload from 'vue-lazyload';
import parallax from 'vue-parallax-js';
import modals from 'vue-js-modal';
import tooltip from 'v-tooltip';

// import modules
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
  defaultTemplate: '<div class="c-tooltips__single" role="tooltip"><div class="c-tooltips__inner"></div></div>',
  defaultContainer: '.c-tooltips',
  defaultInnerSelector: '.c-tooltips__inner',
});

// create vue instance
new Vue({
  el: '#app',
  i18n,
  router,
  store,
  render: h => h(app),
});
