/* eslint-disable one-var */
import Vue from 'vue';
import Vuex from 'vuex';
import router from '@/router';
import { spotify } from '@/api/providers/spotify';
import createLogger from 'vuex/dist/logger';
import createPersistedState from 'vuex-persistedstate';

// import modules
import user from './user';
import player from './player';
import playback from './playback';
import auth from './auth';
import app from './app';

Vue.use(Vuex);

/* eslint-disable no-new */

const createApiPlugin = ({ getters, dispatch }) => {
  const accessToken = getters['auth/getAccessToken'];

  // router navigation guard
  router.beforeEach((to, from, next) => {
    if (!accessToken) {
      // prevent route navigation
      next(false);
      // login the user
      dispatch('auth/LOGIN_USER');
    }
    // go to next route
    next();
  });

  // spotify api request interceptor
  spotify.interceptors.request.use((config) => {
    const { headers } = config;

    // add access token to request header
    if (accessToken) headers.Authorization = `Bearer ${accessToken}`;

    // return the axios config and continue the request
    return config;
  }, null);

  // spotify api response interceptor
  spotify.interceptors.response.use(null, (error) => {
    if (accessToken) {
      // refresh the token when a 401 error occurs while a access token exists
      if (error.response.status === 401) dispatch('auth/REFRESH_TOKEN');
    } else {
      // login the user if no access token exists
      dispatch('auth/LOGIN_USER');
    }
  });
};

const store = new Vuex.Store({
  strict: true,
  modules: {
    app,
    user,
    player,
    playback,
    auth,
  },
  plugins: [createPersistedState(), createLogger(), createApiPlugin],
});

export default store;
