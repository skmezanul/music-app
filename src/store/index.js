import Vue from 'vue'
import Vuex from 'vuex'
import { createVuexLoader } from 'vuex-loading'

Vue.use(Vuex)

const VuexLoading = createVuexLoader({
  // The Vuex module name, 'loading' by default.
  moduleName: 'loading',
  // The Vue component name, 'v-loading' by default.
  componentName: 'v-loading',
  // Vue component class name, 'v-loading' by default.
  className: 'v-loading',
});

Vue.use(VuexLoading)

const store = new Vuex.Store({
  strict: true,
  state: {
    artist: {},
    currentUser: {},
    deviceID: null,
    loading: true
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
