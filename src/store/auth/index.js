import actions from './actions';
import mutations from './mutations';

const auth = {
  namespaced: true,
  state: {
    accessToken: '',
    refreshToken: '',
    expiryTime: '',
    spotifyBackendToken: '',
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
