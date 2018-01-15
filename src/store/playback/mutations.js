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
};

export default mutations;
