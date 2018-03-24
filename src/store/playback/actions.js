import Vue from 'vue';

const actions = {
  /**
   * Initialize Web Playback SDK instance and p u s it to state.
   * Creates a Spotify Connect Playback device
   */
  INIT_PLAYER({ dispatch, getters, commit }) {
    window.onSpotifyWebPlaybackSDKReady = () => {
      const currentUser = getters.getCurrentUser,
        player = new Spotify.Player({
          name: `Music App - ${currentUser.display_name}`,
          getOAuthToken: (callback) => {
          // Run code to get a fresh access token
            dispatch('GET_TOKEN', { action: 'refresh' }).then(() => {
              const newToken = getters.getAccessToken;
              callback(newToken);
            });
          },
          volume: 0.5,
        });

      player.connect().then((success) => {
        if (success) {
          commit('SET_PLAYER', player);
          dispatch('GET_PLAYBACK');
          dispatch('WATCH_PLAYBACK');
        }
      });
    };
  },

  /**
   * Watch the current playback and commit it to state.
   */
  WATCH_PLAYBACK({ state, dispatch }) {
    state.player.addListener('player_state_changed', () => {
      setTimeout(() => {
        dispatch('GET_PLAYBACK');
      }, 500);
    });
  },

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
  SKIP_TO({ getters }, payload) {
    const { direction } = payload;

    if (direction) {
      Vue.prototype.$spotifyApi({
        method: 'post',
        url: `/me/player/${direction}`,
        params: {
          device_id: getters.getDeviceId,
        },
      });
    }
  },

  /**
  * Seek to position in track,
  * @param { object } payload The function payload.
  * @param { number } payload.position The position to seek to.
  */
  SEEK_TO({ getters }, payload) {
    const { position } = payload;

    if (position) {
      Vue.prototype.$spotifyApi({
        method: 'put',
        url: '/me/player/seek',
        params: {
          position_ms: position,
          device_id: getters.getDeviceId,
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
  SET_PLAYBACK({ getters }, payload) {
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
