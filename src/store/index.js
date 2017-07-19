import Vue from 'vue'
import Vuex from 'vuex'
import singles from './singles'
import concerts from './concerts'

Vue.use(Vuex)

const store = new Vuex.Store({
  strict: true,
  state: {
    singles,
    concerts,
    artist: {},
    album: {}
  },
  mutations: {
    artistInfo(state, response) {
      state.artist = response
    },
    albumInfo(state, response) {
      state.album = response
    }
  }
});

export default store
