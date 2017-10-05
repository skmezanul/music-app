<template lang="pug">
main.main-container
  // stage
  ma-stage(
    :subtitle='$t("library")',
    :title='$tc("album", 0)',
    :image='albums[0].album.images[0].url')

  .page-container
    // albums
    ma-section

      .section-items-container
        ma-item(
          v-for='item in albums',
          :key='item.album.id',
          :type='item.album.type',
          :primaryid='item.album.id',
          :image='item.album.images[0].url',
          :title='item.album.name')
</template>

<script>
export default {
  data() {
    return {
      albums: [],
    };
  },
  created() {
    // fetch the data when the view is created and the data is
    // already being observed
    this.getSavedAlbums();
  },
  methods: {
    // get this user's saved tracks from the api
    getSavedAlbums() {
      const that = this;
      const market = that.$store.getters.getMarket;

      that.$startLoading('fetching data');
      that.axios({
        method: 'get',
        url: '/me/albums',
        params: {
          market,
        },
      }).then((res) => {
        that.albums = res.data.items;
        that.$endLoading('fetching data');
      });
    },
  },
};
</script>
