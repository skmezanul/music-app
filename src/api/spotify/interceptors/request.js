import store from '@/store';
import spotify from '../../providers/spotify/';
import { credentials } from '../../config';

// spotify api request interceptor
spotify.interceptors.request.use((instance) => {
  const config = instance;
  const { accessToken } = credentials;
  if (!accessToken) {
    store.dispatch('LOGIN_USER').then(() => config);
  }
  config.headers.Authorization = `Bearer ${accessToken}`;
  return config;
}, err => Promise.reject(err));
