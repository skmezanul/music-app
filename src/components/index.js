// Import Vue.js
import Vue from 'vue'

// Import Normalize.css
import 'normalize.css/normalize.css'

// Import Components
import flextable from './flextable.vue'
Vue.component('flextable', flextable)

import sectionitem from './sectionitem.vue'
Vue.component('sectionitem', sectionitem)

import eventcard from './eventcard.vue'
Vue.component('eventcard', eventcard)

import headerbar from './headerbar.vue'
Vue.component('headerbar', headerbar)

import footerbar from './footerbar.vue'
Vue.component('footerbar', footerbar)

import parallax from 'vue-parallaxy'
Vue.component('parallax', parallax)

import slider from 'vue-slider-component'
Vue.component('slider', slider)

// Import Plugins
import tooltip from 'v-tooltip'
Vue.use(tooltip)

// Import Directives
import viewport from 'vue-in-viewport-directive'
Vue.directive('in-viewport', viewport)
