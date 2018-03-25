const actions = {
  /**
  * Initialize the app and user data on initial load.
  */
  INIT_APP({ dispatch }) {
    // init Spotify Web Playback SDK
    dispatch('player/INIT_PLAYER', null, { root: true });
    // get current user's profile
    dispatch('user/GET_USER', 'profile', { root: true });
    // get current user's playlists
    dispatch('user/GET_USER', 'playlists', { root: true });
  },
};

export default actions;
