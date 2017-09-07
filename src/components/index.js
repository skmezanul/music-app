// import
import Vue from 'vue';
import 'normalize.css/normalize.css';
import slider from 'vue-slider-component';
import tooltip from 'v-tooltip';
import parallax from 'vue-parallax-js';
import viewport from 'vue-in-viewport-directive';
import stage from './layout/stage';
import navigation from './layout/navigation';
import header from './layout/header';
import footer from './layout/footer';
import section from './layout/section';
import list from './list';
import item from './item';
import loader from './loader';
import splash from './splash';
import notice from './notice';

// register components
Vue.component('ma-slider', slider);
Vue.component('ma-stage', stage);
Vue.component('ma-navigation', navigation);
Vue.component('ma-header', header);
Vue.component('ma-footer', footer);
Vue.component('ma-section', section);
Vue.component('ma-list', list);
Vue.component('ma-item', item);
Vue.component('ma-loader', loader);
Vue.component('ma-splash', splash);
Vue.component('ma-notice', notice);

// register plugins
Vue.use(tooltip);
Vue.use(parallax);

// register directives
Vue.directive('in-viewport', viewport);
