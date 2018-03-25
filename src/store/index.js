/* eslint-disable one-var */
import Vue from 'vue';
import Vuex from 'vuex';
import { createVuexLoader } from 'vuex-loading';
import createPersistedState from 'vuex-persistedstate';

// import modules
import user from './user';
import player from './player';
import playback from './playback';
import auth from './auth';
import app from './app';

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
  modules: {
    app,
    user,
    player,
    playback,
    auth,
  },
  plugins: [VuexLoading.Store, createPersistedState()],
});

export default store;
