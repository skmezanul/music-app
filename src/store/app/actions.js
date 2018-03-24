const actions = {
  /**
  * Initialize the app and user data on initial load.
  */
  INIT_APP({ dispatch }) {
    // init Spotify Web Playback SDK
    dispatch('INIT_PLAYER');
    // get current user's profile
    dispatch('GET_USER', 'profile');
    // get current user's playlists
    dispatch('GET_USER', 'playlists');
  },
};

export default actions;
