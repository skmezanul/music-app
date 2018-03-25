import Vue from 'vue';
import store from '@/store';

const mutations = {
  /**
  * Push the current playback to state.
  * @param { object } playback Current playback data.
  */
  SET_PLAYBACK(state, playback) {
    const self = state,
      currentUser = store.getters['user/getCurrentUser'];

    if (playback) {
      self.current = playback;
      if (currentUser.id) {
        Vue.prototype.$database.ref(`users/${currentUser.id}/currentPlayback`).set({
          track: playback.item.name,
          artist: playback.item.artists[0].name,
          album: playback.item.album.name,
          trackId: playback.item.id,
        });
      }
    }
  },
};

export default mutations;
