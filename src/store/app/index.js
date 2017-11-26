import actions from './actions';
import mutations from './mutations';

const app = {
  state: {
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
      accentColor: '#ca2a59',
      largeCover: false,
    },
  },
  actions,
  mutations,
  getters: {
    getNotices: state => state.notices,
    getAppSettings: state => state.settings,
    getStageContent: state => state.stage,
  },
};

export default app;
