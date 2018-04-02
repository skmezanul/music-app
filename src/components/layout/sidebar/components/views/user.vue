<template>
<div class="c-sidebarPanel__parent">

    <maPanelList
    :items="listItems" 
    @close-panel="$emit('close-panel')"
    ></maPanelList>

</div>
</template>

<script>
import maPanelList from '../panelList';

export default {

  computed: {

    // get items for list
    listItems() {
      return [{
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
        name: 'logout',
        routeName: 'logout',
      }];
    },
  },

  components: {
    maPanelList,
  },

};
</script>
