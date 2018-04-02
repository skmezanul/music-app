<template>
<div class="c-sidebarPanel__parent">

    <maPanelList
    :items="playlists"
    @close-panel="$emit('close-panel')"
    ></maPanelList>

</div>
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
