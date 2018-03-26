const mutations = {
  /**
  * Add or remove a notice.
  * @param { object } payload The function payload.
  * @param { string } [ payload.type = 'error', 'warning' ] The type of the notice.
  * @param { string } payload.message The message to show in the notice.
  * @param { string } [ payload.action = 'add', 'remove' ] Add or remove a notice.
  */
  SET_NOTICE(state, payload) {
    const self = state,
      { type, message, action } = payload;

    switch (action) {
      case 'remove':
        self.notices.shift();
        break;
      case 'add':
      default:
        self.notices.unshift({ type, message });
    }
  },

  /**
  * Push app settings to state.
  * @param { object } payload The function payload.
  * @param { string } [ payload.setting = 'accentColor', 'largeCover', 'fixedSidebar' ] The state to push the data to.
  * @param { string } payload.value The new value to save to the targeted state.
  */
  SET_APP_SETTINGS(state, payload) {
    const self = state;

    if (payload) {
      Object.keys(payload).forEach((key) => {
        if (self.settings[key]) self.settings[key] = payload[key];
      });
    }
  },

  /**
  * Push stage content to state.
  * @param { object } payload The function payload.
  * @param { string } payload.image Background or cover image url.
  * @param { string } payload.title Stage title.
  * @param { string } payload.subtitle Stage subtitle.
  * @param { object } payload.profile Artist or user data for single album or playlist page.
  * @param { string } payload.meta Stage meta text.
  * @param { number } payload.popularity Artist popularity.
  * @param { object } payload.buttons Buttons to show.
  * @param { array } payload.info Stage info items.
  * @param { array } payload.navigation Stage navigation items.
  */
  SET_STAGE(state, payload) {
    const self = state;

    // clear the stage
    self.stage = {};

    if (payload) {
      // push new stage content to state
      Object.keys(payload).forEach((key) => {
        self.stage[key] = payload[key];
      });
    }
  },

  /**
  * Set the app's init state.
  * @param { boolean } initialized Is the app initialized.
  */
  SET_INIT(state, initialized) {
    const self = state;

    if (typeof initialized === 'boolean') self.initialized = initialized;
  },
};

export default mutations;
