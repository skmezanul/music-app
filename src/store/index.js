import Vue from 'vue'
import Vuex from 'vuex'
import singles from './singles'
import concerts from './concerts'
import similar from './similar'

Vue.use(Vuex)

const store = new Vuex.Store({
  strict: true,
  state: {
    singles,
    similar,
    concerts,
    playing: true,
    collapsed: true
  }
});

export default store
