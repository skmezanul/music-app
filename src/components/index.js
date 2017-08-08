// import
import Vue from 'vue';
import 'normalize.css/normalize.css';
import slider from 'vue-slider-component';
import tooltip from 'v-tooltip';
import parallax from 'vue-parallax-js';
import viewport from 'vue-in-viewport-directive';
import stage from './layout/stage.vue';
import sideNav from './layout/sidenav.vue';
import header from './layout/header.vue';
import footer from './layout/footer.vue';
import section from './layout/section.vue';
import flexTable from './flextable.vue';
import sectionItem from './sectionitem.vue';
import eventCard from './eventcard.vue';
import search from './search.vue';
import spinner from './spinner.vue';
import notice from './notice.vue';

// register components
Vue.component('ma-slider', slider);
Vue.component('ma-stage', stage);
Vue.component('ma-sidenav', sideNav);
Vue.component('ma-header', header);
Vue.component('ma-footer', footer);
Vue.component('ma-section', section);
Vue.component('ma-list', flexTable);
Vue.component('ma-item', sectionItem);
Vue.component('ma-event', eventCard);
Vue.component('ma-search', search);
Vue.component('ma-spinner', spinner);
Vue.component('ma-notice', notice);

// register plugins
Vue.use(tooltip);
Vue.use(parallax);

// register directives
Vue.directive('in-viewport', viewport);
