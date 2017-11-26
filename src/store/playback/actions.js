import Vue from 'vue';

const actions = {
  /**
   * Get the current playback and commit it to state.
   * Dispatch [REFETCH_TIMER] in promise.
   */
  GET_PLAYBACK({ commit, dispatch }) {
    setTimeout(() => {
      Vue.prototype.$spotifyApi({
        method: 'get',
        url: '/me/player',
      }).then((res) => {
        // push current playback to store
        commit('SET_PLAYBACK', res.data);

        // re-fetch after track ended
        dispatch('REFETCH_TIMER', {
          playbackProgress: res.data.progress_ms,
          trackDuration: res.data.item.duration_ms,
        });
      });
    }, 500);
  },

  /**
  * Dispatches action [GET_PLAYBACK] after timeout has ended.
  * @param { object } payload The function payload.
  * @param { number } payload.trackDuration The duration of the track.
  * @param { number } payload.playbackProgress The progress of the track.
  */
  REFETCH_TIMER({ dispatch }, payload) {
    const { trackDuration, playbackProgress } = payload,
      remainingTime = (trackDuration - playbackProgress);

    new Promise(resolve => setTimeout(resolve, remainingTime)).then(() => {
      dispatch('GET_PLAYBACK');
    });
  },

  /**
  * Skip to next or previous track.
  * @param { object } payload The function payload.
  * @param { string } [ payload.direction = 'next', 'previous' ] The direction to skip.
  */
  SKIP({ dispatch, getters }, payload) {
    const { direction } = payload;

    if (direction) {
      Vue.prototype.$spotifyApi({
        method: 'post',
        url: `/me/player/${direction}`,
        params: {
          device_id: getters.getDeviceId,
        },
      }).then(() => {
        dispatch('GET_PLAYBACK');
      });
    }
  },

  /**
  * Resume / pause the current playback or change playing track.
  * @param { object } payload The function payload.
  * @param { string } [ payload.state = 'play', 'pause' ] State to change the playback to.
  * @param { string } payload.trackId ID of the track to play.
  */
  SET_PLAYBACK({ dispatch, getters }, payload) {
    let uris;

    // play track if trackId in request payload and state set to 'play'
    const playTrack = payload.state === 'play' && payload.trackId;
    if (playTrack) {
      uris = [`spotify:track:${payload.trackId}`];
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
      dispatch('GET_PLAYBACK');
    });
  },

  /**
  * Toggle repeat for the current playback.
  */
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

  /**
  * Set shuffle state for the current playback.
  */
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

export default actions;
