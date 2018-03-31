<template lang='pug'>
api-request.view-parent(:resource='dataToFetch', v-model='response')

  // stage
  ma-stage(
    v-if='response.categoryInfo',
    :subtitle='$tc("category", 1)',
    :title='response.categoryInfo.name')

  .view-content(v-if='response.category')
    // tracks
    ma-section

      .section-items-container
        ma-item(
          v-for='playlist in response.category.playlists.items',
          :key='playlist.id',
          :type='playlist.type',
          :primaryid='playlist.id',
          :secondaryid='playlist.owner.id',
          :image='playlist.images',
          :title='playlist.name')
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
        categoryInfo: () => api.getCategoryInfo(id),
        category: () => api.getCategoryPlaylists(id),
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
