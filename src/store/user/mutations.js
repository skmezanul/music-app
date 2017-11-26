const mutations = {
  /**
  * Push the current users profile or playlists to state.
  * @param { object } payload The function payload.
  * @param { string } [ payload.userData = 'profile', 'playlists' ] The state to push the data to.
  * @param { string } payload.data Profile or playlists data to push to state.
  */
  CURRENT_USER(state, payload) {
    const self = state,
      { userData, data } = payload;

    self[userData] = data;
  },
};

export default mutations;
