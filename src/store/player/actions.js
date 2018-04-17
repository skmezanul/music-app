const actions = {
  /**
  * Initialize Web Playback SDK instance and push the player instance to state.
  * Creates a Spotify Connect playback device.
  */
  INIT_PLAYER({ dispatch, rootGetters, commit }) {
    window.onSpotifyWebPlaybackSDKReady = () => {
      const currentUser = rootGetters['user/getCurrentUser'],
        /* eslint-disable no-undef */
        player = new Spotify.Player({
          name: `Music App - ${currentUser.display_name}`,
          volume: 0.5,
          getOAuthToken: (callback) => {
          // Run code to get a fresh access token
            dispatch('auth/GET_TOKEN', { action: 'refresh' }, { root: true }).then(() => {
              const newToken = rootGetters['auth/getAccessToken'];
              callback(newToken);
            }, { root: true });
          },
        });

      // connect to player
      player.connect().then(() => {
        commit('SET_PLAYER', player);
        dispatch('WATCH_PLAYER');
      }).catch((err) => {
        commit('app/SET_NOTICE', {
          action: 'add',
          type: 'error',
          message: `Error: ${err}`,
        }, { root: true });
      });
    };
  },

  /**
  * Watch the current playback and push changes to state.
  */
  WATCH_PLAYER({ state, dispatch, commit }) {
    const { player } = state;

    dispatch('playback/GET_PLAYBACK', null, { root: true });

    // add state change listener
    player.addListener('player_state_changed', () => {
      setTimeout(() => {
        dispatch('playback/GET_PLAYBACK', null, { root: true });
      }, 500);
    });

    // add error listeners
    player.addListener('initialization_error', ({ message }) => {
      commit('app/SET_NOTICE', { action: 'add', type: 'error', message }, { root: true });
    });
    player.addListener('authentication_error', ({ message }) => {
      commit('app/SET_NOTICE', { action: 'add', type: 'error', message }, { root: true });
    });
    player.addListener('account_error', ({ message }) => {
      commit('app/SET_NOTICE', { action: 'add', type: 'error', message }, { root: true });
    });
    player.addListener('playback_error', ({ message }) => {
      commit('app/SET_NOTICE', { action: 'add', type: 'error', message }, { root: true });
    });
  },

  /**
  * Toggle the playback.
  */
  TOGGLE_PLAYBACK({ state }) {
    const { player } = state;

    player.togglePlay().catch((err) => {
      commit('app/SET_NOTICE', { action: 'add', type: 'error', message: err }, { root: true });
    });
  },

  /**
  * Seek to position in track,
  * @param { object } payload The function payload.
  * @param { number } payload.position The position to seek to.
  */
  SEEK_TO({ state, commit }, { position }) {
    const { player } = state;

    if (position) {
      player.seek(position).catch((err) => {
        commit('app/SET_NOTICE', { action: 'add', type: 'error', message: err }, { root: true });
      });
    }
  },
};

export default actions;
