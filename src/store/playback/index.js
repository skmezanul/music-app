import actions from './actions';
import mutations from './mutations';

const playback = {
  state: {
    current: [],
    player: {},
  },
  actions,
  mutations,
  getters: {
    getCurrentPlayback: state => state.current,
    getDuration: state => state.current.item.duration_ms,
    getProgress: state => state.current.progress_ms,
    getPlayer: state => state.player,
    getDeviceId: state => state.player['_options'].id,
  },
};

export default playback;
