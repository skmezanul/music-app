import Vue from 'vue';

const actions = {
  /**
  * Get the current users profile or playlists.
  * @param { string } [ userData = 'profile', 'playlists' ] Data to fetch from the api.
  */
  GET_USER({ commit }, userData) {
    let url;

    switch (userData) {
      case 'playlists':
        url = '/me/playlists';
        break;
      case 'profile':
      default:
        url = '/me';
    }

    Vue.prototype.$spotifyApi({
      method: 'get',
      url,
    }).then((res) => {
      commit('CURRENT_USER', {
        userData,
        data: res.data,
      });
    });
  },
};

export default actions;
