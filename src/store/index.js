import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const store = new Vuex.Store({
  strict: true,
  state: {
    artist: {},
    currentUser: {},
    deviceID: null
  },
  mutations: {
    artistInfo(state, response) {
      state.artist = response
    },
    currentUser(state, response) {
      state.currentUser = response
    },
    deviceID(state, response) {
      state.deviceID = response
    }
  }
});

export default store
