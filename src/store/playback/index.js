import actions from './actions';
import mutations from './mutations';

const playback = {
  state: {
    current: [],
  },
  actions,
  mutations,
  getters: {
    getCurrentPlayback: state => state.current,
    getDuration: state => state.current.item.duration_ms,
    getProgress: state => state.current.progress_ms,
    getDeviceId: state => state.current.device.id,
  },
};

export default playback;
