/* eslint-disable one-var */
import Vue from 'vue';
import Vuex from 'vuex';
import createLogger from 'vuex/dist/logger';
import createPersistedState from 'vuex-persistedstate';

// import api utilities
import spotifyApiUtils from '@/api/providers/spotify/utils';
import backendApiUtils from '@/api/providers/backend/utils';

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
  plugins: [spotifyApiUtils, backendApiUtils, createPersistedState(), createLogger()],
});

export default store;
