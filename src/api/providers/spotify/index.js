/* eslint-disable one-var */
import axios from 'axios';

// register spotify axios instance
export const spotify = axios.create({
  baseURL: 'https://api.spotify.com/v1/',
});

// register spotify backend axios instance
export const spotifyBackend = axios.create({
  baseURL: 'https://spclient.wg.spotify.com/open-backend-2/v1/',
});

export function storeApiPlugin(store) {
  console.log(store.state.auth.accessToken);
  store.watch(state => state.auth.accessToken, (accessToken) => {
    console.log('storeApiPlugin: The watcher callback is called, we save the authHeader in our axios instance');
    if (accessToken) {
      spotify.defaults.headers.Authorization = `Bearer ${accessToken}`;
      spotify.interceptors.response.use(res => res, (err) => {
        const { status } = err.response.data.error;
        // if unauthenticated
        if (status === 401) store.dispatch('auth/REFRESH_TOKEN');
      });
    } else {
      delete spotify.default.headers.Authorization;
      spotify.interceptors.response.use(res => res, (err) => {
        const { status } = err.response.data.error;
        // if unauthenticated
        if (status === 401) store.dispatch('auth/LOGIN_USER');
      });
    }
  });
}
