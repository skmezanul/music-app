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
    artist: [],
    currentUser: [],
    deviceID: null,
    error: null,
  },
  mutations: {
    currentUser(state, res) {
      state.currentUser = res;
    },
    deviceID(state, res) {
      state.deviceID = res;
    },
    error(state, res) {
      state.error = res;
    },
  },
  plugins: [VuexLoading.Store],
});

export default store;
