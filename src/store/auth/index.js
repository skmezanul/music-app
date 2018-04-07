import actions from './actions';
import mutations from './mutations';

const auth = {
  namespaced: true,
  state: {
    accessToken: {
      type: String,
    },
    refreshToken: {
      type: String,
    },
    expiryTime: {
      type: Number,
    },
    spotifyBackendToken: {
      type: String,
    },
  },
  actions,
  mutations,
  getters: {
    getAccessToken: state => state.accessToken,
    getRefreshToken: state => state.refreshToken,
    getExpiryTime: state => state.expiryTime,
    getBackendToken: state => state.spotifyBackendToken,
  },
};

export default auth;
