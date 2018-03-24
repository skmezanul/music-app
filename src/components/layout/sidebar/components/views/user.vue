<template lang='pug'>
.view-parent
  maPanelList(:items='items', @close-panel='$emit("close-panel")')
</template>

<script>
import { mapGetters } from 'vuex';

import maPanelList from '../panelList';

export default {

  data: () => ({
    items: [{
      name: 'myprofile',
      routeName: 'user',
      meta: 'visitprofile',
    },
    {
      name: 'myaccount',
      meta: 'manageaccount',
    },
    {
      name: 'settings',
      routeName: 'settings',
      meta: 'changesettings',
    },
    {
      name: 'debug',
      routeName: 'debug',
      meta: 'debugapp',
    },
    {
      name: 'logout',
      routeName: 'logout',
    },
    ],
  }),

  computed: {
    ...mapGetters({
      currentUser: 'getCurrentUser',
    }),
  },

  components: {
    maPanelList,
  },

};
</script>
