export default {
  getAccessToken: state => state.accessToken,
  getCurrentPlayback: state => state.currentPlayback,
  getDeviceId: state => state.currentPlayback.device.id,
  getCurrentUser: state => state.currentUser,
  getMarket: state => state.currentUser.country,
  getCountry: state => state.currentUser.country,
  getLocale: state => state.currentUser.country,
  getNotices: state => state.notices,
};
