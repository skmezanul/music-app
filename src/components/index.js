// import
import Vue from 'vue';
import 'normalize.css/normalize.css';
import slider from 'vue-slider-component';
import tooltip from 'v-tooltip';
import parallax from 'vue-parallax-js';
import viewport from 'vue-in-viewport-directive';
import stage from './stage.vue';
import sideNav from './sidenav.vue';
import header from './header.vue';
import footer from './footer.vue';
import section from './section.vue';
import flexTable from './flextable.vue';
import sectionItem from './sectionitem.vue';
import eventCard from './eventcard.vue';
import search from './search.vue';
import spinner from './spinner.vue';
import notice from './notice.vue';

// register components
Vue.component('slider', slider);
Vue.component('stage', stage);
Vue.component('sidenav', sideNav);
Vue.component('headerbar', header);
Vue.component('footerbar', footer);
Vue.component('pagesection', section);
Vue.component('flextable', flexTable);
Vue.component('sectionitem', sectionItem);
Vue.component('eventcard', eventCard);
Vue.component('search', search);
Vue.component('spinner', spinner);
Vue.component('notice', notice);

// register plugins
Vue.use(tooltip);
Vue.use(parallax);

// register directives
Vue.directive('in-viewport', viewport);
