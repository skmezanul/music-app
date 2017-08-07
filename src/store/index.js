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
    currentPlayback: null,
    currentUser: [],
    deviceID: null,
    notice: [],
  },
  mutations: {
    CURRENT_PLAYBACK(state, data) {
      state.currentPlayback = data;
    },
    CURRENT_USER(state, data) {
      state.currentUser = data;
    },
    DEVICE_ID(state, ID) {
      state.deviceID = ID;
    },
    ADD_NOTICE(state, data) {
      state.notice.push(data);
    },
    REMOVE_NOTICE(state, index) {
      state.notice.splice(index, 1);
    },
  },
  plugins: [VuexLoading.Store],
});

export default store;
