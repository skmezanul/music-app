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
      const that = this;
      that.$startLoading('data');

      that.axios.all([
          that.getSavedAlbums(),
        ]).then((res) => {
          that.data.albums = res[0].data.items;
          // init stage
          that.setStage({
            image: res[0].data.items[0].album.images[0].url,
            subtitle: that.$t('library'),
            title: that.$tc('album', 0),
            buttons: [{
                title: 'playall',
                icon: 'play_circle_filled',
              },
              {
                title: 'edit',
                icon: 'mode_edit',
              },
            ],
          });
          that.$endLoading('data');
        });
    },

    // get this user's saved tracks from the api
    getSavedAlbums() {
      const that = this,
            market = that.market;

      return that.$spotifyApi({
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
