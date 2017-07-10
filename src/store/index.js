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
  },
   getters: {
     getSingles(state) {
       return state.singles;
     },
     getSimilar(state) {
       return state.similar;
     },
     getConcerts(state) {
       return state.concerts;
     }
   }
});

export default store
