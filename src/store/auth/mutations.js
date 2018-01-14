const mutations = {
  /**
  * Push credentials to state.
  * @param { object } payload The function payload.
  * @param { string } payload.accessToken The spotify api access token.
  * @param { string } payload.refreshToken The spotify api refresh token.
  * @param { number } payload.expiresIn The duration in seconds that the token is valid..
  */
  SET_CREDENTIALS(state, payload) {
    const self = state,
      { accessToken, refreshToken, expiresIn } = payload;
    if (accessToken) self.accessToken = accessToken;
    if (refreshToken) self.refreshToken = refreshToken;
    if (expiresIn) {
      // convert expiry time format
      const expiryTime = Date.now() + (payload.expiresIn * 1000);
      self.expiryTime = expiryTime;
    }
  },
};

export default mutations;
