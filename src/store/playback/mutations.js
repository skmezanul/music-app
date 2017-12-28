import Vue from 'vue';
import store from '@/store';

const mutations = {
  /**
  * Push the current playback to state.
  * @param { object } playback Current playback data.
  */
  SET_PLAYBACK(state, playback) {
    const self = state,
      { getCurrentUser } = store.getters,
      {
        album,
        artists,
        id,
        name,
      } = playback.item;

    if (playback) {
      self.current = playback;
      if (getCurrentUser.id) {
        const data = {
            album,
            artists,
            id,
            name,
          },
          usersCollectionRef = Vue.prototype.$database.collection('users'),
          userDocumentRef = usersCollectionRef.doc(getCurrentUser.id);

        // write data to database
        userDocumentRef.set(data);
      }
    }
  },
};

export default mutations;
