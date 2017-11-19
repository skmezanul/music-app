import Vue from 'vue';
import Vuex from 'vuex';
import { createVuexLoader } from 'vuex-loading';
import createPersistedState from 'vuex-persistedstate';
import mutations from './mutations';
import actions from './actions';
import getters from './getters';

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
    stage: {
      image: '',
      title: '',
      subtitle: '',
      artistid: '',
      meta: '',
      buttons: {},
      navigation: [],
    },
    settings: {
      accentColor: '#ca2a59',
      largeCover: false,
    },
    credentials: {
      accessToken: '',
      refreshToken: '',
      expiryTime: '',
    },
  },
  mutations,
  actions,
  getters,
  plugins: [VuexLoading.Store, createPersistedState()],
});

export default store;
