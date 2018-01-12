// import dependencies
import Vue from 'vue';
import 'normalize.css/normalize.css';
import 'material-design-icons/iconfont/material-icons.css';
import slider from 'vue-slider-component';
import tooltip from 'v-tooltip';
import parallax from 'vue-parallax-js';
import visibility from 'vue-observe-visibility';
import viewports from 'vue-match-media/src';
import modals from 'vue-js-modal';

// import components
import stage from './layout/stage';
import section from './layout/section';
import list from './list';
import item from './item';
import button from './button';
import notice from './notice';
import icon from './icon';
import carousel from './carousel/';

// register components
Vue.component('ma-slider', slider);
Vue.component('ma-stage', stage);
Vue.component('ma-section', section);
Vue.component('ma-list', list);
Vue.component('ma-item', item);
Vue.component('ma-button', button);
Vue.component('ma-notice', notice);
Vue.component('ma-icon', icon);
Vue.component('ma-carousel', carousel);

// register plugins
Vue.use(parallax);
Vue.use(visibility);
Vue.use(viewports);
Vue.use(modals, { componentName: 'ma-modal' });
Vue.use(tooltip, {
  defaultClass: '',
  /* eslint-disable max-len */
  defaultTemplate: '<div class="tooltip" role="tooltip"><div class="tooltip-inner"></div></div>',
  defaultContainer: '.tooltip-container',
});
