const actions = {
  /**
  * Get the current playback and commit it to state.
  */
  GET_PLAYBACK({ commit, dispatch }) {
    dispatch('endpoints/GET_PLAYBACK').then((res) => {
      // push current playback to store
      commit('SET_PLAYBACK', res.data);
    });
  },

  /**
  * Skip to next or previous track.
  * @param { object } payload The function payload.
  * @param { string } [ payload.direction = 'next', 'previous' ] The direction to skip.
  */
  SKIP_TO({ dispatch }, { direction }) {
    if (direction) dispatch('endpoints/SKIP_TO', { direction });
  },

  /**
  * Seek to position in track,
  * @param { object } payload The function payload.
  * @param { number } payload.position The position to seek to.
  */
  SEEK_TO({ dispatch }, { position }) {
    if (position) dispatch('endpoints/SKIP_TO', { position });
  },

  /**
  * Resume / pause the current playback or change playing track.
  * @param { object } payload The function payload.
  * @param { string } [ payload.state = 'play', 'pause' ] State to change the playback to.
  * @param { string } payload.trackId ID of the track to play.
  */
  SET_PLAYBACK({ dispatch }, { state, trackId }) {
    let uris;

    // play track if trackId in request payload and state set to 'play'
    if (state === 'play' && trackId) {
      uris = [`spotify:track:${trackId}`];
    }

    if (state) dispatch('endpoints/SET_PLAYBACK', { state, uris });
  },

  /**
  * Toggle repeat for the current playback.
  */
  TOGGLE_REPEAT({ dispatch }) {
    dispatch('endpoints/TOGGLE_REPEAT');
  },

  /**
  * Set shuffle state for the current playback.
  */
  SET_SHUFFLE({ dispatch }) {
    dispatch('endpoints/SET_SHUFFLE');
  },
};

export default actions;
