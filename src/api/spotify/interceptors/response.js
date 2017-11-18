import store from '@/store';
import spotify from '../../providers/spotify/';

// spotify api response interceptor
spotify.interceptors.response.use(null, (err) => {
  const error = `Error: ${err.message}.`;
  let message;

  switch (err.response.status) {
    default:
      message = error;
      break;

    // 401 unauthorized
    case '401':
      message = `${error} - It is likely your access token has expired.`;
      break;

    // 403 forbidden
    case '403':
      message = `${error} - This action requires a Spotify Premium subscription.`;
      break;

    // 503 service unavailable
    case '503':
      message = `${error} - The server is currently unable to handle the request.`;
      break;

    // 404 not found
    case '404':
      message = `${error} - The requested resource could not be found.`;
      break;
  }

  // commit notice to vuex store
  if (store.state.notices.length <= 3) {
    store.commit('SHOW_NOTICE', {
      action: 'add',
      type: 'error',
      message,
    });
  }
});
