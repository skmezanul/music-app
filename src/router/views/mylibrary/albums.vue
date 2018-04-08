<template lang='pug'>
api-request.o-view__parent(:resource='dataToFetch', v-model='response')

  // stage
  ma-stage(
    v-if='response.albums',
    :image='response.albums.items[0].album.images',
    :subtitle='$t("library")',
    :title='$tc("album", 0)',
    :info='getInfo')

  .o-view__content(v-if='response.albums')
    // albums
    ma-section

      .c-viewSection__inner
        ma-item(
          v-for='item in response.albums.items',
          :key='item.album.id',
          :type='item.album.type',
          :primaryid='item.album.id',
          :image='item.album.images',
          :title='item.album.name',
          :artists='item.album.artists')
</template>

<script>
import { mapActions } from 'vuex';

export default {

  data: () => ({
    response: {},
  }),

  methods: {
    ...mapActions('endpoints', {
      getMyProfile: 'GET_MY_PROFILE',
    }),
  },

  computed: {
    // get data to fetch from api
    dataToFetch() {
      return {
        albums: () => this.getMyProfile({ type: 'albums' }),
      };
    },

    // get stage info
    getInfo() {
      const self = this,
        { albums } = self.response,
        albumCount = albums.items.length;

      return [{
        value: albumCount,
        subtitle: self.$tc('album', albumCount === 1 ? 1 : 0),
      }];
    },
  },

};
</script>
