import Vue from 'vue';

const mutations = {
  /**
  * Push the current users profile or playlists to state.
  * @param { object } payload The function payload.
  * @param { string } [ payload.type = 'profile', 'playlists' ] The state to push the data to.
  * @param { string } payload.data Profile or playlists data to push to state.
  */
  CURRENT_USER(state, payload) {
    const self = state,
      { type, data } = payload;

    if (type && data) {
      self[type] = data;
      if (type === 'profile') {
        Vue.prototype.$database.ref(`users/${data.id}`).set({
          profileImage: data.images[0].url,
          userId: data.id,
          name: data.display_name,
        });
      }
    }
  },
};

export default mutations;
