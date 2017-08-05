import Vue from 'vue';
import Vuex from 'vuex';
import { createVuexLoader } from 'vuex-loading';

const VuexLoading = createVuexLoader({
  moduleName: 'loading',
  componentName: 'loading',
  className: 'loading',
});

Vue.use(Vuex);
Vue.use(VuexLoading);

const store = new Vuex.Store({
  strict: true,
  state: {
    artist: {},
    currentUser: {},
    deviceID: null,
  },
  mutations: {
    artistInfo(state, response) {
      state.artist = response;
    },
    currentUser(state, response) {
      state.currentUser = response;
    },
    deviceID(state, response) {
      state.deviceID = response;
    },
  },
  plugins: [VuexLoading.Store],
});

export default store;
