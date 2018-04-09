const mutations = {
  /**
  * Push the current users profile or playlists to state.
  * @param { object } payload The function payload.
  * @param { string } [ payload.type = 'profile', 'playlists' ] The state to push the data to.
  * @param { string } payload.data Profile or playlists data to push to state.
  */
  CURRENT_USER(state, { type, data }) {
    const self = state;

    if (type && data) {
      self[type] = data;
    }
  },
};

export default mutations;
