import { getAuthURL, getAccessToken, refreshAccessToken, getSpotifyBackendToken } from '@/api/providers/backend';

const actions = {
  /**
  * Redirect the user to external spotify login page.
  */
  LOGIN_USER({ state }) {
    const { protocol, host } = window.location;

    getAuthURL({ protocol, host }).then((res) => {
      if (!state.accessToken) window.location.href = res.data.url;
    });
  },

  /**
  * Call the backend api and get an access token.
  * @param { object } payload The function payload.
  * @param { string } payload.code The code returned from spotify login page.
  */
  GET_TOKEN({ commit }, { code }) {
    if (code) {
      getAccessToken({ code }).then((res) => {
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

  /**
  * Call the backend api and refresh the access token.
  */
  REFRESH_TOKEN({ getters, commit }) {
    const refreshToken = getters.getRefreshToken;

    if (refreshToken) {
      refreshAccessToken({ refreshToken }).then((res) => {
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

  /**
  * Get the access token for spotify's backend api with additional artist info.
  */
  GET_BACKEND_TOKEN({ commit }) {
    getSpotifyBackendToken().then((res) => {
      commit('SET_CREDENTIALS', {
        spotifyBackendToken: res.data.accessToken,
      });
    }).catch((err) => {
      commit('app/SET_NOTICE', {
        action: 'add',
        type: 'error',
        message: `Error: ${err}`,
      }, { root: true });
    });
  },
};

export default actions;
