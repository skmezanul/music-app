import router from '@/router';
import { spotify } from './';

const spotifyApiUtils = ({ getters, dispatch }) => {
  const accessToken = getters['auth/getAccessToken'];

  // router navigation guard
  router.beforeEach((to, from, next) => {
    if (!accessToken) {
      // prevent route navigation
      next(false);
      // login the user
      dispatch('auth/LOGIN_USER');
    }
    // go to next route
    next();
  });

  // spotify api request interceptor
  spotify.interceptors.request.use((config) => {
    const { headers, params } = config;

    // replace params with getter when store is available
    Object.keys(params).forEach((key) => {
      const item = params[key],
        getterArray = item.split('getters/'),
        isGetter = getterArray.length > 1;

      if (isGetter) params[key] = getters[getterArray[1]];
    });

    // add access token to request header
    if (accessToken) {
      headers.Authorization = `Bearer ${accessToken}`;
    }

    // return the axios config and continue the request
    return config;
  }, null);

  // spotify api response interceptor
  spotify.interceptors.response.use(null, (error) => {
    const { status } = error.response;

    if (accessToken) {
      // refresh the token when a 401 error occurs while a access token exists
      if (status === 401) dispatch('auth/REFRESH_TOKEN');
    } else {
      // login the user if no access token exists
      dispatch('auth/LOGIN_USER');
    }
  });
};

export default spotifyApiUtils;
