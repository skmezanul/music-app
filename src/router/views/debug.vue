<template lang="pug">
.view-parent
  // stage
  ma-stage(:title='$t("debug")')

  .view-content
    ma-section(
      title='Current User',
      :collapsible='true')

      pre(v-html='currentUser')

    ma-section(
      title='Current Playback',
      :collapsible='true')

      pre(v-html='currentPlayback')

    ma-section(
      title='Access Token',
      :collapsible='true')

      pre(v-html='accessToken')

    ma-section(
      title='Device ID',
      :collapsible='true')

      pre(v-html='deviceId')
</template>

<script>
import { mapGetters } from 'vuex';

export default {
  computed: {
    ...mapGetters({
      currentUser: 'getCurrentUser',
      currentPlayback: 'getCurrentPlayback',
      accessToken: 'getAccessToken',
      deviceId: 'getDeviceId',
    }),
  },
};
</script>
