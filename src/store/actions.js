import Vue from 'vue';
import queryString from 'query-string';
import store from './';

export default {
  // check for spotify access token and get it if not already in local storage
  CHECK_TOKEN() {
    const url = window.location;
    const obj = {
      // your spotify api client id
      // get it from https://developer.spotify.com/my-applications/
      client_id: '',
      // url the user gets redirected to after logged in with spotify
      redirect_uri: `${url.protocol}//${url.host}/callback`,
      // scopes to grant the app access to specific data
      scope: 'playlist-read-private user-library-read user-read-private user-top-read user-read-playback-state user-modify-playback-state user-read-currently-playing',
      // get a token back from the spotify api
      response_type: 'token',
    };
    const str = queryString.stringify(obj);

    // redirect to spotify login if no access token in local storage
    if (!localStorage.getItem('spotify_token')) {
      store.commit('ADD_NOTICE', 'You are not logged in, redirecting to spotify login.');
      // wait 1 second before redirecting to spotify login page
      setTimeout(() => {
        url.href = `https://accounts.spotify.com/authorize?${str}`;
      }, 1000);
    }
  },

  // get the current user's info
  GET_CURRENT_USER() {
    Vue.axios({
      method: 'get',
      url: '/me',
    }).then((res) => {
      store.commit('CURRENT_USER', res.data);
    }).catch(() => {
      store.commit('ADD_NOTICE', this.$t('errors.currentuser'));
    });
  },

  // get my devices
  GET_MY_DEVICES() {
    Vue.axios({
      method: 'get',
      url: '/me/player/devices',
    }).then((res) => {
      store.commit('DEVICE_ID', res.data.devices[0].id);
    }).catch(() => {
      store.commit('ADD_NOTICE', this.$t('errors.devices'));
    });
  },

  // get the current playback
  GET_CURRENT_PLAYBACK() {
    Vue.axios({
      method: 'get',
      url: '/me/player',
    }).then((res) => {
      store.commit('CURRENT_PLAYBACK', res.data);
    }).catch(() => {
      store.commit('ADD_NOTICE', this.$t('errors.currentplayback'));
    });
  },
};
