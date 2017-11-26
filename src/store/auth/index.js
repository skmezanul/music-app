import actions from './actions';
import mutations from './mutations';

const auth = {
  state: {
    accessToken: '',
    refreshToken: '',
    expiryTime: '',
  },
  actions,
  mutations,
  getters: {
    getAccessToken: state => state.accessToken,
    getRefreshToken: state => state.refreshToken,
    getExpiryTime: state => state.expiryTime,
  },
};

export default auth;
