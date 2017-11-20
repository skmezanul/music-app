import store from '@/store';
import spotify from '../../providers/spotify/';
import { credentials } from '../../config';

// spotify api request interceptor
spotify.interceptors.request.use(() => {
  const { accessToken } = credentials;
  if (!accessToken) {
    store.dispatch('LOGIN_USER');
  }
}, err => Promise.reject(err));
