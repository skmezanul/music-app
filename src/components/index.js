// import
import Vue from 'vue';
import 'normalize.css/normalize.css';
import 'material-design-icons/iconfont/material-icons.css';
import slider from 'vue-slider-component';
import tooltip from 'v-tooltip';
import parallax from 'vue-parallax-js';
import visibility from 'vue-observe-visibility';
import viewports from 'vue-match-media/src';
import modals from 'vue-js-modal';

import stage from './layout/stage';
import section from './layout/section';
import list from './list';
import item from './item';
import shelf from './shelf';
import button from './button';
import notice from './notice';

// register components
Vue.component('ma-slider', slider);
Vue.component('ma-stage', stage);
Vue.component('ma-section', section);
Vue.component('ma-list', list);
Vue.component('ma-item', item);
Vue.component('ma-shelf', shelf);
Vue.component('ma-button', button);
Vue.component('ma-notice', notice);

// register plugins
Vue.use(parallax);
Vue.use(visibility);
Vue.use(viewports);
Vue.use(modals, { componentName: 'ma-modal' });
Vue.use(tooltip, {
  defaultClass: '',
  defaultTemplate: '<div class="tooltip" role="tooltip"><div class="tooltip-inner"></div></div>',
  defaultContainer: '.tooltip-container',
});
