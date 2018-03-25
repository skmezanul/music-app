<template lang='pug'>
.view-parent
  maPanelList(:items='playlists', @close-panel='$emit("close-panel")')
</template>

<script>
import { mapGetters } from 'vuex';

import maPanelList from '../panelList';

export default {

  computed: {
    ...mapGetters('user', {
      playlists: 'getPlaylists',
    }),
  },

  components: {
    maPanelList,
  },

};
</script>
