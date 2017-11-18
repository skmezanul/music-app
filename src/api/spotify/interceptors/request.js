import spotify from '../../providers/spotify/';
import { credentials } from '../../config';

// spotify api request interceptor
spotify.interceptors.request.use((instance) => {
  const config = instance;
  if (credentials.accessToken) {
    config.headers.Authorization = `Bearer ${credentials.accessToken}`;
  }
  return config;
}, err => Promise.reject(err));
