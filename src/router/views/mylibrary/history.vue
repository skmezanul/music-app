<template lang='pug'>
api-request.view-parent(:resource='dataToFetch', v-model='response')

  // stage
  ma-stage(
    v-if='response.history',
    :image='response.history.items[0].track.album.images',
    :subtitle='$t("library")',
    :title='$t("recentlyplayed")',
    :navigation='getNavigation',
    :buttons='getButtons')

  .view-content(v-if='response.history')
    // tracks
    ma-section

      ol.list
        ma-list(
          v-for='(history, index) in response.history.items',
          :key='index',
          :type='history.track.type',
          :image='history.track.album.images',
          :title='history.track.name',
          :trackId='history.track.id',
          :artists='history.track.artists',
          :album='history.track.album',
          :explicit='history.track.explicit',
          :popularity='history.track.popularity',
          :duration='history.track.duration_ms',
          :index='index')
</template>

<script>
export default {

  data: () => ({
    response: {},
  }),

  computed: {
    // get data to fetch from api
    dataToFetch() {
      const self = this,
        api = self.$api;

      return {
        history: () => api.getMyPlaybackHistory('track'),
      };
    },

    // get stage buttons
    getButtons() {
      return {
        playall: true,
      };
    },
  },

};
</script>
