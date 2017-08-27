import Vue from 'vue';
import Vuex from 'vuex';
import { createVuexLoader } from 'vuex-loading';
import mutations from './mutations';
import actions from './actions';

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
    currentPlayback: '',
    currentUser: [],
    deviceID: '',
    notices: [],
    scrollPosition: '',
  },
  mutations,
  actions,
  plugins: [VuexLoading.Store],
});

export default store;
