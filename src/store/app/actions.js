const actions = {
  /**
  * Initialize the app and user data on initial load.
  */
  INIT_APP({ dispatch, rootGetters }) {
    const accessToken = rootGetters['auth/getAccessToken'];

    if (!accessToken) {
      dispatch('auth/LOGIN_USER', null, { root: true });
    } else {
      // init Spotify Web Playback SDK
      dispatch('player/INIT_PLAYER', null, { root: true });
      // get current user's profile
      dispatch('user/GET_USER', { type: 'profile' }, { root: true });
      // get current user's playlists
      dispatch('user/GET_USER', { type: 'playlists' }, { root: true });
    }
  },
};

export default actions;
