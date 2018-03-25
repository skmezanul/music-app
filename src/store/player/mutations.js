const mutations = {
  /**
  * Push the Spotify Web Playback SDK instance to state.
  * @param { object } instance Playback SDK instance.
  */
  SET_PLAYER(state, instance) {
    const self = state;

    if (instance) self.player = instance;
  },
};

export default mutations;
