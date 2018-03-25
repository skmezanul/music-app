import Vue from 'vue';

const actions = {
  /**
  * Get the current playback and commit it to state.
  */
  GET_PLAYBACK({ commit }) {
    Vue.prototype.$spotifyApi({
      method: 'get',
      url: '/me/player',
    }).then((res) => {
      // push current playback to store
      commit('SET_PLAYBACK', res.data);
    });
  },

  /**
  * Skip to next or previous track.
  * @param { object } payload The function payload.
  * @param { string } [ payload.direction = 'next', 'previous' ] The direction to skip.
  */
  SKIP_TO({ rootGetters }, payload) {
    const { direction } = payload;

    if (direction) {
      Vue.prototype.$spotifyApi({
        method: 'post',
        url: `/me/player/${direction}`,
        params: {
          device_id: rootGetters['player/getDeviceId'],
        },
      });
    }
  },

  /**
  * Seek to position in track,
  * @param { object } payload The function payload.
  * @param { number } payload.position The position to seek to.
  */
  SEEK_TO({ rootGetters }, payload) {
    const { position } = payload;

    if (position) {
      Vue.prototype.$spotifyApi({
        method: 'put',
        url: '/me/player/seek',
        params: {
          position_ms: position,
          device_id: rootGetters['player/getDeviceId'],
        },
      });
    }
  },

  /**
  * Resume / pause the current playback or change playing track.
  * @param { object } payload The function payload.
  * @param { string } [ payload.state = 'play', 'pause' ] State to change the playback to.
  * @param { string } payload.trackId ID of the track to play.
  */
  SET_PLAYBACK({ rootGetters }, payload) {
    let uris;

    // play track if trackId in request payload and state set to 'play'
    if (payload.state === 'play' && payload.trackId) {
      uris = [`spotify:track:${payload.trackId}`];
    }

    Vue.prototype.$spotifyApi({
      method: 'put',
      url: `/me/player/${payload.state}`,
      data: {
        uris,
      },
      params: {
        device_id: rootGetters['player/getDeviceId'],
      },
    });
  },

  /**
  * Toggle repeat for the current playback.
  */
  TOGGLE_REPEAT({ rootGetters }) {
    Vue.prototype.$spotifyApi({
      method: 'put',
      url: '/me/player/repeat',
      params: {
        state: 'context',
        device_id: rootGetters['player/getDeviceId'],
      },
    });
  },

  /**
  * Set shuffle state for the current playback.
  */
  SET_SHUFFLE({ rootGetters }) {
    Vue.prototype.$spotifyApi({
      method: 'put',
      url: '/me/player/shuffle',
      params: {
        state: !rootGetters['playback/getCurrentPlayback'].shuffle_state,
        device_id: rootGetters['player/getDeviceId'],
      },
    });
  },
};

export default actions;
