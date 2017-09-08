import Vue from 'vue';

export default {

  // get the current user's info
  GET_CURRENT_USER({ commit }) {
    Vue.axios({
      method: 'get',
      url: '/me',
    }).then((res) => {
      commit('CURRENT_USER', res.data);
      if (!localStorage.getItem('app_language')) {
        localStorage.setItem('app_language', res.data.country);
      }
    }).catch(() => {
      commit('ADD_NOTICE', this.$t('errors.fetchuser'));
    });
  },

  // get my devices
  GET_MY_DEVICES({ commit }) {
    Vue.axios({
      method: 'get',
      url: '/me/player/devices',
    }).then((res) => {
      commit('DEVICE_ID', res.data.devices[0].id);
    }).catch(() => {
      commit('ADD_NOTICE', this.$t('errors.fetchdevices'));
    });
  },

  // get the current playback
  GET_CURRENT_PLAYBACK({ commit }) {
    Vue.axios({
      method: 'get',
      url: '/me/player',
    }).then((res) => {
      commit('CURRENT_PLAYBACK', res.data);
    }).catch(() => {
      commit('ADD_NOTICE', this.$t('errors.fetchplayback'));
    });
  },
};
