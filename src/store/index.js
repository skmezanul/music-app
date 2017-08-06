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
    currentPlayback(state, data) {
      state.currentPlayback = data;
    },
    currentUser(state, data) {
      state.currentUser = data;
    },
    deviceID(state, ID) {
      state.deviceID = ID;
    },
    notice(state, data) {
      state.notice.push(data);
    },
    removeNotice(state, index) {
      state.notice.splice(index, 1);
    },
  },
  plugins: [VuexLoading.Store],
});

export default store;
