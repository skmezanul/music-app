export default {
  // set the api credentials (accessToken, refreshToken, expiry)
  SET_CREDENTIALS(state, payload) {
    const self = state.credentials;
    const { accessToken, refreshToken, expiresIn } = payload;
    if (accessToken) self.accessToken = accessToken;
    if (refreshToken) self.refreshToken = refreshToken;
    if (expiresIn) {
      const expiryTime = Date.now() + (payload.expires_in * 1000);
      self.expiryTime = expiryTime;
    }
  },

  // push the current playback to store
  CURRENT_PLAYBACK(state, data) {
    const self = state;
    self.currentPlayback = data;
  },

  // push the current users profile, playlists or following to store
  CURRENT_USER(state, payload) {
    const self = state;
    const { dataToFetch, data } = payload;
    let targetState;

    switch (dataToFetch) {
      case 'playlists':
        targetState = 'playlists';
        break;
      case 'profile':
      default:
        targetState = 'currentUser';
    }

    self[targetState] = data;
  },

  // add or remove notice
  NOTICE(state, payload) {
    const self = state;
    const {
      type,
      message,
      action,
    } = payload;
    const notice = {
      type,
      message,
    };

    switch (action) {
      case 'remove':
        self.notices.shift();
        break;
      case 'add':
      default:
        self.notices.unshift(notice);
    }
  },

  // push app settings to store
  SET_APP_SETTINGS(state, payload) {
    const self = state;
    const { setting, value } = payload;
    self.settings[setting] = value;
  },

  // push stage content to store
  SET_STAGE(state, payload) {
    const self = state;
    self.stage = payload;
  },
};
