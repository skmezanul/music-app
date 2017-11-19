<template lang="pug">
.view-parent
  // stage
  ma-stage(v-show='!$isLoading("data")')

  .view-content(v-if='!$isLoading("data")')
    // albums
    ma-section

      .section-items-container
        ma-item(
          v-for='item in data.albums',
          :key='item.album.id',
          :type='item.album.type',
          :primaryid='item.album.id',
          :image='item.album.images',
          :title='item.album.name',
          :artists='item.album.artists')
</template>

<script>
import { mapGetters, mapMutations } from 'vuex';

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
    this.fetchData();
  },
  methods: {
    ...mapMutations({
      setStage: 'SET_STAGE',
    }),

    fetchData() {
      const self = this;
      self.$startLoading('data');

      self.axios.all([
          self.getSavedAlbums(),
        ]).then((res) => {
          self.data.albums = res[0].data.items;
          // init stage
          self.setStage({
            image: res[0].data.items[0].album.images[0].url,
            subtitle: self.$t('library'),
            title: self.$tc('album', 0),
            buttons: {
              playall: true,
            },
          });
          self.$endLoading('data');
        });
    },

    // get this user's saved tracks from the api
    getSavedAlbums() {
      const self = this,
            market = self.market;

      return self.$spotifyApi({
        method: 'get',
        url: '/me/albums',
        params: {
          market,
        },
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
