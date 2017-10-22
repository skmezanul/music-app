<template lang="pug">
main.main-container
  // stage
  ma-stage(
    :subtitle='$t("library")',
    :title='$tc("album", 0)',
    :image='data.albums[0].album.images[0].url')

  .page-container
    // albums
    ma-section

      .section-items-container
        ma-item(
          v-for='item in data.albums',
          :key='item.album.id',
          :type='item.album.type',
          :primaryid='item.album.id',
          :image='item.album.images[0].url',
          :title='item.album.name')
</template>

<script>
import { mapGetters } from 'vuex';

export default {
  data() {
    return {
      data: {
        albums: [],
      },
    };
  },
  created() {
    // fetch the data when the view is created and the data is
    // already being observed
    this.$startLoading('fetching data');
    this.getSavedAlbums();
  },
  methods: {
    // get this user's saved tracks from the api
    getSavedAlbums() {
      const that = this,
            market = that.market;

      that.$spotifyApi({
        method: 'get',
        url: '/me/albums',
        params: {
          market,
        },
      }).then((res) => {
        that.data.albums = res.data.items;
        that.$endLoading('fetching data');
      });
    },
  },
  computed: {
    ...mapGetters({
      market: 'getMarket',
    }),
  },
};
</script>
