import Vue from 'vue';
import router from '@/router';

const actions = {
  /**
  * Redirect the user to external spotify login page.
  */
  LOGIN_USER({ state }) {
    const { protocol, host } = window.location;

    Vue.prototype.$backendApi({
      method: 'get',
      url: `/getAuthURL?redirectURI=${protocol}//${host}/login`,
    }).then((res) => {
      if (!state.accessToken) window.location.href = res.data.url;
    });
  },

  /**
  * Call the backend api and save returned credentials to state.
  * @param { object } payload The function payload.
  * @param { string } payload.code The code returned from spotify login page.
  * @param { string } [ payload.action = 'get', 'refresh' ] Get the token or refresh it.
  */
  GET_TOKEN({ commit, getters }, payload) {
    const refreshToken = getters.getRefreshToken,
      { code, action } = payload;
    let url;

    switch (action) {
      case 'refresh':
        // Refresh an expired token by calling /refreshToken
        url = `/refreshToken?token=${refreshToken}`;
        break;
      case 'get':
      default:
        // Exchange the code for the full credentials by calling /getToken
        url = `/getToken?code=${code}`;
    }

    if (code || refreshToken) {
      Vue.prototype.$backendApi({
        method: 'get',
        url,
      }).then((res) => {
        commit('SET_CREDENTIALS', res.data);
        router.push({
          name: 'browse',
        });
      });
    }
  },
};

export default actions;
