<template lang='pug'>
.view-parent
  // stage
  ma-stage(v-show='!$isLoading("data")')

  .view-content(v-if='!$isLoading("data")')
    // albums
    ma-section

      .section-items-container
        ma-item(
          v-for='(item, index) in data.albums',
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
        const albums = res[0].data.items,
          albumCount = albums.length,
          stageImage = albums[0].album.images[0].url;

        self.data.albums = albums;
        // init stage
        self.setStage({
          image: stageImage,
          subtitle: self.$t('library'),
          title: self.$tc('album', 0),
          buttons: {
            playall: true,
          },
          info: [{
            value: albumCount,
            subtitle: self.$tc('album', albumCount === 1 ? 1 : 0),
          },
          ],
        });
        self.$endLoading('data');
      });
    },

    // get this user's saved tracks from the api
    getSavedAlbums() {
      const self = this,
        { market } = self;

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
