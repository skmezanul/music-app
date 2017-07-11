// Import Vue.js
import vue from 'vue'

// Import Normalize.css
import 'normalize.css/normalize.css'

// Import Components
import flextable from './flextable.vue'
vue.component('flextable', flextable)

import sectionitem from './sectionitem.vue'
vue.component('sectionitem', sectionitem)

import eventcard from './eventcard.vue'
vue.component('eventcard', eventcard)

import parallax from 'vue-parallaxy'
vue.component('parallax', parallax)

import slider from 'vue-slider-component'
vue.component('slider', slider)

// Import Plugins
import tooltip from 'v-tooltip'
vue.use(tooltip)

// Import Directives
import viewport from 'vue-in-viewport-directive'
vue.directive('in-viewport', viewport)
