import Vue from 'vue'
import normalize from 'normalize.css/normalize.css'
import FlexTable from './flextable.vue'
Vue.component('flextable', FlexTable)
import SectionItem from './sectionitem.vue'
Vue.component('sectionitem', SectionItem)
import EventCard from './eventcard.vue'
Vue.component('eventcard', EventCard)
import Parallax from 'vue-parallaxy'
Vue.component('parallax', Parallax)
import vueSlider from 'vue-slider-component'
Vue.component('vue-slider', vueSlider)
import VTooltip from 'v-tooltip'
Vue.use(VTooltip)
import inViewportDirective from 'vue-in-viewport-directive'
Vue.directive('in-viewport', inViewportDirective)
