import Vue from 'vue';
import Vuex from 'vuex';
import { createVuexLoader } from 'vuex-loading';

const VuexLoading = createVuexLoader({
  moduleName: 'loading',
  componentName: 'ma-loading',
  className: 'loading',
});

Vue.use(Vuex);
Vue.use(VuexLoading);

/* eslint-disable no-new */

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
      const thisState = state;
      thisState.currentPlayback = data;
    },
    CURRENT_USER(state, data) {
      const thisState = state;
      thisState.currentUser = data;
    },
    DEVICE_ID(state, data) {
      const thisState = state;
      thisState.deviceID = data;
    },
    ADD_NOTICE(state, data) {
      const thisState = state;
      thisState.notices.unshift(data);
    },
    REMOVE_NOTICE(state, index) {
      const thisState = state;
      thisState.notices.splice(index, 1);
    },
    SCROLL_POSITION(state, position) {
      const thisState = state;
      thisState.scrollPosition = position;
    },
  },
  plugins: [VuexLoading.Store],
});

export default store;
