import Vue from 'vue';
import queryString from 'query-string';
import store from './';

export default {
  // check for spotify access token and get it if not already in local storage
  CHECK_TOKEN() {
    const obj = {
      // your spotify api client id
      // get it from https://developer.spotify.com/my-applications/
      client_id: '',
      // redirect url
      redirect_uri: 'http://localhost:8080/callback',
      scope: 'playlist-read-private user-library-read user-read-private user-top-read user-read-playback-state user-modify-playback-state user-read-currently-playing',
      response_type: 'token',
    };
    const str = queryString.stringify(obj);

    // redirect to spotify login if no access token in local storage
    if (!localStorage.getItem('spotify_token')) {
      window.location.href = `https://accounts.spotify.com/authorize?${str}`;
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
