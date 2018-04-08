<template lang='pug'>
api-request.o-view__parent(:resource='dataToFetch', v-model='response')

  // stage
  ma-stage(
    v-if='response.categoryInfo',
    :subtitle='$tc("category", 1)',
    :title='response.categoryInfo.name')

  .o-view__content(v-if='response.category')
    // tracks
    ma-section

      .c-viewSection__inner
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
import { mapActions } from 'vuex';

export default {

  data: () => ({
    response: {},
  }),

  methods: {
    ...mapActions('endpoints', {
      getCategoryInfo: 'GET_CATEGORY_INFO',
      getCategoryPlaylists: 'GET_CATEGORY_PLAYLISTS',
    }),
  },

  computed: {
    // get data to fetch from api
    dataToFetch() {
      const self = this,
        { id } = self.$route.params;

      return {
        categoryInfo: () => self.getCategoryInfo({ id }),
        category: () => self.getCategoryPlaylists({ id }),
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
  },

};
</script>
