import Vue from 'vue';

const actions = {
  /**
  * Get the current users profile or playlists.
  * @param { string } [ type = 'profile', 'playlists' ] Data to fetch from the api.
  */
  GET_USER({ commit }, type) {
    if (type) {
      Vue.prototype.$api.getMyProfile(type).then((res) => {
        commit('CURRENT_USER', {
          type,
          data: res.data,
        });
      });
    }
  },
};

export default actions;
