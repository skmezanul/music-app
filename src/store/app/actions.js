const actions = {
  /**
  * Initialize the app and user data on initial load.
  */
  INIT_APP({ commit, dispatch, rootGetters }) {
    const accessToken = rootGetters['auth/getAccessToken'];

    if (!accessToken) {
      dispatch('auth/LOGIN_USER', null, { root: true });
    } else {
      // set the app's init state to true
      commit('SET_INIT', true);
      // init Spotify Web Playback SDK
      dispatch('player/INIT_PLAYER', null, { root: true });
      // get current user's profile
      dispatch('user/GET_USER', 'profile', { root: true });
      // get current user's playlists
      dispatch('user/GET_USER', 'playlists', { root: true });
    }
  },
};

export default actions;
