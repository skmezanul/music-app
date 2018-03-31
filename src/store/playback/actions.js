import Vue from 'vue';

const actions = {
  /**
  * Get the current playback and commit it to state.
  */
  GET_PLAYBACK({ commit }) {
    Vue.prototype.$api.getPlayback().then((res) => {
      // push current playback to store
      commit('SET_PLAYBACK', res.data);
    });
  },

  /**
  * Skip to next or previous track.
  * @param { object } payload The function payload.
  * @param { string } [ payload.direction = 'next', 'previous' ] The direction to skip.
  */
  SKIP_TO(context, payload) {
    const { direction } = payload;

    if (direction) Vue.prototype.$api.skipTo(direction);
  },

  /**
  * Seek to position in track,
  * @param { object } payload The function payload.
  * @param { number } payload.position The position to seek to.
  */
  SEEK_TO(context, payload) {
    const { position } = payload;

    if (position) Vue.prototype.$api.seekTo(position);
  },

  /**
  * Resume / pause the current playback or change playing track.
  * @param { object } payload The function payload.
  * @param { string } [ payload.state = 'play', 'pause' ] State to change the playback to.
  * @param { string } payload.trackId ID of the track to play.
  */
  SET_PLAYBACK(context, payload) {
    const { state, trackId } = payload;
    let uris;

    // play track if trackId in request payload and state set to 'play'
    if (state === 'play' && trackId) {
      uris = [`spotify:track:${trackId}`];
    }

    if (state) Vue.prototype.$api.setPlayback(state, uris);
  },

  /**
  * Toggle repeat for the current playback.
  */
  TOGGLE_REPEAT() {
    Vue.prototype.$api.toggleRepeat();
  },

  /**
  * Set shuffle state for the current playback.
  */
  SET_SHUFFLE() {
    Vue.prototype.$api.setShuffle();
  },
};

export default actions;
