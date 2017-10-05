import Vue from 'vue';

export default {

  // get the current user's info
  GET_CURRENT_USER({ commit }) {
    Vue.axios({
      method: 'get',
      url: '/me',
    }).then((res) => {
      commit('CURRENT_USER', res.data);
    });
  },

  // get the current playback
  GET_CURRENT_PLAYBACK({ commit }) {
    Vue.axios({
      method: 'get',
      url: '/me/player',
    }).then((res) => {
      commit('CURRENT_PLAYBACK', res.data);
    });
  },
};
