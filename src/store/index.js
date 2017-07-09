import Vue from 'vue'
import Vuex from 'vuex'
import singles from './singles'
Vue.use(Vuex)

const store = new Vuex.Store({
  strict: true,
  state: {
    singles,
  }
});

export default store
