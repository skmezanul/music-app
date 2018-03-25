import store from '@/store';
import spotify from '../../providers/spotify/';
import { credentials } from '../../config';

// spotify api request interceptor
spotify.interceptors.request.use((instance) => {
  const config = instance,
    { accessToken } = credentials;

  if (!accessToken) {
    store.dispatch('auth/LOGIN_USER').then(() => config);
  } else {
    config.headers.Authorization = `Bearer ${accessToken}`;
  }
  return config;
}, err => Promise.reject(err));
