import Vue from 'vue';
import store from '@/store';

const mutations = {
  /**
  * Push the current playback to state.
  * @param { object } playback Current playback data.
  */
  SET_PLAYBACK(state, playback) {
    const self = state,
      { getCurrentUser } = store.getters;

    if (playback) {
      self.current = playback;
      if (getCurrentUser.id) {
        Vue.prototype.$database.ref(`users/${getCurrentUser.id}/currentPlayback`).set(playback);
      }
    }
  },

  /**
  * Push the Spotify Web Playback SDK instance to state.
  * @param { object } player Playback SDK instance.
  */
  SET_PLAYER(state, player) {
    const self = state;

    if (player) self.player = player;
  },
};

export default mutations;
