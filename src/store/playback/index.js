import actions from './actions';
import mutations from './mutations';

const playback = {
  namespaced: true,
  state: {
    current: [],
  },
  actions,
  mutations,
  getters: {
    getCurrentPlayback: state => state.current,
    getDuration: state => state.current.item.duration_ms,
    getProgress: state => state.current.progress_ms,
  },
};

export default playback;
