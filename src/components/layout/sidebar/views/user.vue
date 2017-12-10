<template lang='pug'>
.view-parent
  ul
    router-link(
      v-for='item in items',
      :key='item.name',
      tag='li',
      :class='item.name',
      :to='{ name: item.routeName, params: item.routeName === "user" ? { id: currentUser.id } : {}}',
      @click.native='$emit("clicked-element", $event)')
      span.title {{ $tc(item.name, 0) }}
      .meta-container
        span {{ item.routeName === 'logout' ? `${$t('loggedinas')} ${currentUser.display_name}` : $t(item.meta) }}
</template>

<script>
import {
  mapGetters,
} from 'vuex';

export default {
  data() {
    return {
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
    };
  },
  computed: {
    ...mapGetters({
      currentUser: 'getCurrentUser',
    }),
  },
};
</script>
