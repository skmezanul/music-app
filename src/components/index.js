// Import Vue.js
import Vue from 'vue'

// Import Normalize.css
import 'normalize.css/normalize.css'

// Import Components
import stage from './stage.vue'
Vue.component('stage', stage)

import sideNav from './sidenav.vue'
Vue.component('sidenav', sideNav)

import headerBar from './headerbar.vue'
Vue.component('headerbar', headerBar)

import footerBar from './footerbar.vue'
Vue.component('footerbar', footerBar)

import flexTable from './flextable.vue'
Vue.component('flextable', flexTable)

import sectionItem from './sectionitem.vue'
Vue.component('sectionitem', sectionItem)

import eventCard from './eventcard.vue'
Vue.component('eventcard', eventCard)

import search from './search.vue'
Vue.component('search', search)

import loading from './loading.vue'
Vue.component('loading', loading)

import parallax from 'vue-parallaxy'
Vue.component('parallax', parallax)

import slider from 'vue-slider-component'
Vue.component('slider', slider)


// Import Plugins
import tooltip from 'v-tooltip'
Vue.use(tooltip)

import axios from 'axios'
import VueAxios from 'vue-axios'
Vue.use(VueAxios, axios)

// Import Directives
import viewport from 'vue-in-viewport-directive'
Vue.directive('in-viewport', viewport)
