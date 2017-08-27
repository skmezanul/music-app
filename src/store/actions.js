import Vue from 'vue';
import store from './';

export default {
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
