import Vue from 'vue';
import Vuex from 'vuex';
import { createVuexLoader } from 'vuex-loading';
import VuexPersist from 'vuex-persist';
import mutations from './mutations';
import actions from './actions';
import getters from './getters';

const VuexStorage = new VuexPersist({
  key: 'state',
  storage: window.localStorage,
  reducer: state => ({
    accessToken: state.accessToken,
    currentUser: state.currentUser,
    settings: state.settings,
  }),
});

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
    currentPlayback: [],
    currentUser: [],
    playlists: [],
    notices: [],
    accessToken: '',
    settings: {
      accentColor: '#ca2a59',
      largeCover: false,
    },
  },
  mutations,
  actions,
  getters,
  plugins: [VuexLoading.Store, VuexStorage.plugin],
});

export default store;
