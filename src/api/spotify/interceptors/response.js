import store from '@/store';
import spotify from '../../providers/spotify/';

let inExecution = false;

// spotify api response interceptor
spotify.interceptors.response.use(res => res, (err) => {
  if (!inExecution) {
    inExecution = true;

    const { config } = err;
    const { message, status } = err.response.data.error;

    if (status === 401 && message === 'The access token expired') {
      store.dispatch('GET_TOKEN', {
        action: 'refresh',
      }).then(() => {
        spotify(config).then(() => {
          inExecution = false;
        });
      });
    }

    // commit notice to vuex store
    if (store.state.notices.length <= 3) {
      store.commit('NOTICE', {
        action: 'add',
        type: 'error',
        message: `Error: ${err.message}.`,
      });
    }
  }
});
