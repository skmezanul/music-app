import actions from './actions';
import mutations from './mutations';

const app = {
  namespaced: true,
  state: {
    initialized: false,
    notices: [],
    stage: {
      image: '',
      title: '',
      subtitle: '',
      artist: {},
      meta: '',
      popularity: '',
      buttons: {},
      navigation: [],
    },
    settings: {
      accentColor: '#f3376f',
      largeCover: false,
      fixedSidebar: true,
    },
  },
  actions,
  mutations,
  getters: {
    getNotices: state => state.notices,
    getAppSettings: state => state.settings,
    getStageContent: state => state.stage,
    getInitState: state => state.initialized,
  },
};

export default app;
