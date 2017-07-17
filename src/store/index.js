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
    artistInfo(state, artist) {
      state.artist = artist
    },
    albumInfo(state, album) {
      state.album = album
    }
  }
});

export default store
