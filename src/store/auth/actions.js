import Vue from 'vue';
import router from '@/router';

const actions = {
  /**
  * Redirect the user to external spotify login page.
  */
  LOGIN_USER({ state }) {
    const { protocol, host } = window.location;

    Vue.prototype.$api.getAuthURL(protocol, host).then((res) => {
      if (!state.accessToken) window.location.href = res.data.url;
    });
  },

  /**
  * Call the backend api and get an access token.
  * @param { object } payload The function payload.
  * @param { string } payload.code The code returned from spotify login page.
  */
  GET_TOKEN({ commit }, payload) {
    const { code } = payload;

    if (code) {
      Vue.prototype.$api.getAccessToken(code).then((res) => {
        commit('SET_CREDENTIALS', res.data);
        router.push({ name: 'browse' });
      }).catch((err) => {
        commit('app/SET_NOTICE', {
          action: 'add',
          type: 'error',
          message: `Error: ${err}`,
        }, { root: true });
      });
    }
  },

  /**
  * Call the backend api and refresh the access token.
  */
  REFRESH_TOKEN({ getters, commit }) {
    const refreshToken = getters.getRefreshToken;

    if (refreshToken) {
      Vue.prototype.$api.refreshAccessToken(refreshToken).then((res) => {
        commit('SET_CREDENTIALS', res.data);
      }).catch((err) => {
        commit('app/SET_NOTICE', {
          action: 'add',
          type: 'error',
          message: `Error: ${err}`,
        }, { root: true });
      });
    }
  },
};

export default actions;
