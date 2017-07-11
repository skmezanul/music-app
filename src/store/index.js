import Vue from 'vue'
import Vuex from 'vuex'
import singles from './singles'
import concerts from './concerts'
import similar from './similar'
import information from './information'

Vue.use(Vuex)

const store = new Vuex.Store({
  strict: true,
  state: {
    singles,
    similar,
    concerts,
    information
  }
});

export default store