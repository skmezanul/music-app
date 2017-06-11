import Vue from 'vue'
import FlexTable from './flextable.vue'
import SectionItem from './sectionitem.vue'
import Parallax from 'vue-parallaxy'
import vueSlider from 'vue-slider-component/src/vue-slider.vue'
import VTooltip from 'v-tooltip'
Vue.component('flextable', FlexTable)
Vue.component('sectionitem', SectionItem)
Vue.component('parallax', Parallax)
Vue.component('vue-slider', vueSlider)
Vue.use(VTooltip)
