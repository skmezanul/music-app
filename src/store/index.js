/* eslint-disable one-var */
import Vue from 'vue';
import Vuex from 'vuex';
import { storeApiPlugin } from '@/api/providers/spotify/';

// import modules
import app from './app';
import auth from './auth';
import endpoints from './endpoints';
import playback from './playback';
import player from './player';
import user from './user';

Vue.use(Vuex);

/* eslint-disable no-new */

const store = new Vuex.Store({
  strict: true,
  modules: {
    app,
    auth,
    endpoints,
    playback,
    player,
    user,
  },
  plugins: [storeApiPlugin],
});

export default store;
