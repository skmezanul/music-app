import store from '@/store';
import spotify from '../../providers/spotify/';

// spotify api response interceptor
spotify.interceptors.response.use(res => res, (err) => {
  const { message, status } = err.response.data.error;

  // if unauthenticated
  if (status === 401) {
    if (message === 'The access token expired') {
      store.dispatch('auth/REFRESH_TOKEN');
    } else {
      store.dispatch('auth/LOGIN_USER');
    }
  }

  // commit errors to store
  store.commit('app/SET_NOTICE', {
    action: 'add',
    type: 'error',
    message: `Error: ${err.message}.`,
  });
});
