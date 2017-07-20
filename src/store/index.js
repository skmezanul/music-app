import Vue from 'vue'
import Vuex from 'vuex'
import concerts from './concerts'

Vue.use(Vuex)

const store = new Vuex.Store({
  strict: true,
  state: {
    concerts,
    artist: {},
    album: {},
    deviceID: null
  },
  mutations: {
    artistInfo(state, response) {
      state.artist = response
    },
    albumInfo(state, response) {
      state.album = response
    },
    deviceID(state, response) {
      state.deviceID = response
    }
  }
});

export default store
