import { backend } from './';

const backendApiUtils = ({ getters }) => {
  // backend api request interceptor
  backend.interceptors.request.use((config) => {
    const { params } = config;

    // replace params with getter when store is available
    Object.keys(params).forEach((key) => {
      const item = params[key],
        getterArray = item.split('getters/'),
        isGetter = getterArray.length > 1;

      if (isGetter) params[key] = getters[getterArray[1]];
    });

    // return the axios config and continue the request
    return config;
  }, null);
};

export default backendApiUtils;
