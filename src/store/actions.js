import Vue from 'vue';

export default {
  // get the current user's profile
  GET_CURRENT_USER({ commit }) {
    Vue.prototype.$spotifyApi({
      method: 'get',
      url: '/me',
    }).then((res) => {
      commit('CURRENT_USER', res.data);
    });
  },

  // get the current playback
  GET_CURRENT_PLAYBACK({ commit, dispatch }) {
    Vue.prototype.$spotifyApi({
      method: 'get',
      url: '/me/player',
    }).then((res) => {
      // push current playback to store
      commit('CURRENT_PLAYBACK', res.data);
      // re-fetch after track ended
      dispatch('REFETCH_TIMER', {
        playbackProgress: res.data.progress_ms,
        trackDuration: res.data.item.duration_ms,
      });
    });
  },

  REFETCH_TIMER({ dispatch }, payload) {
    const remainingTime = (payload.trackDuration - payload.playbackProgress);
    new Promise(resolve => setTimeout(resolve, remainingTime)).then(() => {
      dispatch('GET_CURRENT_PLAYBACK');
    });
  },

  // skip to previous / next track
  SKIP({ dispatch, getters }, direction) {
    Vue.prototype.$spotifyApi({
      method: 'post',
      url: `/me/player/${direction}`,
      params: {
        device_id: getters.getDeviceId,
      },
    }).then(() => {
      dispatch('GET_CURRENT_PLAYBACK');
    });
  },

  // resume / pause the current playback or change playing track
  SET_PLAYBACK({ dispatch, getters }, payload) {
    let uris;
    if (payload.state === 'play' && typeof payload.trackid !== 'undefined') {
      uris = [`spotify:track:${payload.trackid}`];
    }

    Vue.prototype.$spotifyApi({
      method: 'put',
      url: `/me/player/${payload.state}`,
      data: {
        uris,
      },
      params: {
        device_id: getters.getDeviceId,
      },
    }).then(() => {
      dispatch('GET_CURRENT_PLAYBACK');
    });
  },

  // toggle repeat for the current playback
  TOGGLE_REPEAT({ getters }) {
    Vue.prototype.$spotifyApi({
      method: 'put',
      url: '/me/player/repeat',
      params: {
        state: 'context',
        device_id: getters.getDeviceId,
      },
    });
  },

  // set shuffle state for the current playback
  SET_SHUFFLE({ getters }) {
    Vue.prototype.$spotifyApi({
      method: 'put',
      url: '/me/player/shuffle',
      params: {
        state: !getters.getCurrentPlayback.shuffle_state,
        device_id: getters.getDeviceId,
      },
    });
  },
};
