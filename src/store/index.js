/* eslint-disable one-var */
import Vue from 'vue';
import Vuex from 'vuex';
import createPersistedState from 'vuex-persistedstate';

// import modules
import user from './user';
import player from './player';
import playback from './playback';
import auth from './auth';
import app from './app';

Vue.use(Vuex);

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
  plugins: [createPersistedState()],
});

export default store;
