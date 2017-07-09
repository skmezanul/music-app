import Vue from 'vue'
import Vuex from 'vuex'
import singles from './singles'
import similar from './similar'

Vue.use(Vuex)

const store = new Vuex.Store({
  strict: true,
  state: {
    singles,
    similar,
    playing: true,
    collapsed: true
  }
});

export default store
