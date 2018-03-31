import actions from './actions';
import mutations from './mutations';

const app = {
  namespaced: true,
  state: {
    notices: [],
    settings: {
      currentAccentColor: '#f3376f',
      accentColors: [{
        name: 'red',
        hex: '#f3376f',
      },
      {
        name: 'orange',
        hex: '#e89700',
      },
      {
        name: 'cyan',
        hex: '#00e6e6',
      },
      {
        name: 'green',
        hex: '#1DB954',
      }],
      largeCover: false,
      fixedSidebar: true,
    },
  },
  actions,
  mutations,
  getters: {
    getNotices: state => state.notices,
    getAppSettings: state => state.settings,
    getInitState: state => state.initialized,
  },
};

export default app;
