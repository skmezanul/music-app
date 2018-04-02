<template lang='pug'>
api-request.o-view__parent(:resource='dataToFetch', v-model='response')

  // stage
  ma-stage(
    v-if='response.album',
    :image='response.album.images',
    :subtitle='response.album.album_type',
    :title='response.album.name',
    :info='getInfo',
    :buttons='getButtons')

  .o-view__content(v-if='response.album')
    // tracks
    ma-section(:copyright='response.album.copyrights[0].text')

      ol.c-list
        ma-list(
          v-for='(track, index) in response.album.tracks.items',
          :key='track.id',
          :title='track.name',
          :trackId='track.id',
          :explicit='track.explicit',
          :popularity='track.popularity',
          :duration='track.duration_ms',
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
        api = self.$api,
        { id } = self.$route.params;

      return {
        album: () => api.getAlbum(id),
      };
    },

    // get stage info
    getInfo() {
      const self = this,
        { album } = self.response,
        trackCount = album.tracks.total,
        releaseDate = new Date(album.release_date);

      return [{
        value: releaseDate.toLocaleDateString(),
        subtitle: self.$t('released'),
      },
      {
        value: trackCount,
        subtitle: self.$tc('track', trackCount === 1 ? 1 : 0),
      }];
    },

    // get stage buttons
    getButtons() {
      return {
        playall: true,
        save: true,
      };
    },
  },

};
</script>
