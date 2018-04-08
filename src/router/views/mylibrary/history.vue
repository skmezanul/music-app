<template lang='pug'>
api-request.o-view__parent(:resource='dataToFetch', v-model='response')

  // stage
  ma-stage(
    v-if='response.history',
    :image='response.history.items[0].track.album.images',
    :subtitle='$t("library")',
    :title='$t("recentlyplayed")')

  .o-view__content(v-if='response.history')
    // tracks
    ma-section

      ol.c-list
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
import { mapActions } from 'vuex';

export default {

  data: () => ({
    response: {},
  }),

  methods: {
    ...mapActions('endpoints', {
      getMyPlaybackHistory: 'GET_MY_PLAYBACK_HISTORY',
    }),
  },

  computed: {
    // get data to fetch from api
    dataToFetch() {
      return {
        history: () => this.getMyPlaybackHistory({ type: 'track' }),
      };
    },
  },

};
</script>
