import actions from './actions';
import mutations from './mutations';

const player = {
  namespaced: true,
  state: {
    player: {
      type: Object,
    },
  },
  actions,
  mutations,
  getters: {
    getPlayer: state => state.player,
    getDeviceId: state => state.player['_options'].id,
  },
};

export default player;
