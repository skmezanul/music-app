import { spotify } from './';

const spotifyApiUtils = ({ getters, dispatch }) => {
  // spotify api request interceptor
  spotify.interceptors.request.use((config) => {
    const { headers, params } = config,
      accessToken = getters['auth/getAccessToken'];

    // add access token to request header
    if (accessToken) headers.Authorization = `Bearer ${accessToken}`;

    if (params) {
      // replace params with getter when store is available
      Object.keys(params).forEach((key) => {
        const item = params[key],
          getterArray = item.split('getters/'),
          isGetter = getterArray.length > 1;

        if (isGetter) params[key] = getters[getterArray[1]];
      });
    }

    // return the axios config and continue the request
    return config;
  }, null);

  // spotify api response interceptor
  spotify.interceptors.response.use(null, (error) => {
    const { status } = error.response,
      accessToken = getters['auth/getAccessToken'];

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
