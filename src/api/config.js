/**
 * Your spotify clientID goes here
 * Get it from https://developer.spotify.com/my-applications
 * Create an application if not already done.
 */
export const credentials = {
  // spotify client id
  clientId: '',

  // spotify backend api token (wip)
  backendApiToken: '',

  // youtube api key
  youtubeApiKey: '',
};

// scopes to grant the api access to user data
export const scope = ['playlist-read-private', 'user-library-read', 'user-read-private', 'user-top-read', 'user-read-playback-state', 'user-modify-playback-state', 'user-read-currently-playing'];
