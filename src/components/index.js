// import
import Vue from 'vue';
import VueI18n from 'vue-i18n';
import 'normalize.css/normalize.css';
import slider from 'vue-slider-component';
import tooltip from 'v-tooltip';
import parallax from 'vue-parallax-js';
import viewport from 'vue-in-viewport-directive';
import stage from './layout/stage.vue';
import navigation from './layout/navigation.vue';
import header from './layout/header.vue';
import footer from './layout/footer.vue';
import section from './layout/section.vue';
import list from './list.vue';
import item from './item.vue';
import spinner from './spinner.vue';
import notice from './notice.vue';
import eventCard from './eventcard.vue';

// register components
Vue.component('ma-slider', slider);
Vue.component('ma-stage', stage);
Vue.component('ma-navigation', navigation);
Vue.component('ma-header', header);
Vue.component('ma-footer', footer);
Vue.component('ma-section', section);
Vue.component('ma-list', list);
Vue.component('ma-item', item);
Vue.component('ma-spinner', spinner);
Vue.component('ma-notice', notice);
Vue.component('ma-event', eventCard);

// register plugins
Vue.use(VueI18n);
Vue.use(tooltip);
Vue.use(parallax);

// register directives
Vue.directive('in-viewport', viewport);
