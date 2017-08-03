import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)

import { createVuexLoader } from 'vuex-loading'
const VuexLoading = createVuexLoader({
  moduleName: 'loading',
  componentName: 'v-loading',
  className: 'v-loading',
});
Vue.use(VuexLoading)

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
  },
  plugins: [VuexLoading.Store]
});

export default store
