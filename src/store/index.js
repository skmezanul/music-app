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
    notices: [],
    scrollPosition: null,
  },
  mutations: {
    CURRENT_PLAYBACK(state, data) {
      state.currentPlayback = data;
    },
    CURRENT_USER(state, data) {
      state.currentUser = data;
    },
    DEVICE_ID(state, data) {
      state.deviceID = data;
    },
    ADD_NOTICE(state, data) {
      state.notices.unshift(data);
    },
    REMOVE_NOTICE(state, index) {
      state.notices.splice(index, 1);
    },
    SCROLL_POSITION(state, position) {
      state.scrollPosition = position;
    },
  },
  plugins: [VuexLoading.Store],
});

export default store;
