import actions from './actions';
import mutations from './mutations';

const player = {
  namespaced: true,
  state: {
    player: {},
  },
  actions,
  mutations,
  getters: {
    getPlayer: state => state.player,
    getDeviceId: state => state.player['_options'].id,
  },
};

export default player;
