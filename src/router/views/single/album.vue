<template lang='pug'>
.view-parent
	// stage
	ma-stage(v-show='!$isLoading("data")')

	.view-content(v-if='!$isLoading("data")')
		// tracks
		ma-section(:copyright='data.album.copyrights[0].text')

			ol.list
				ma-list(
          v-for='(track, index) in data.album.tracks.items',
          :key='index',
          :type='track.type',
          :title='track.name',
          :trackId='track.id',
          :explicit='track.explicit',
          :popularity='track.popularity',
          :duration='track.duration_ms',
          :index='index')
</template>

<script>
import { mapGetters, mapMutations } from 'vuex';

export default {
  data() {
    return {
      data: {
        album: [],
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
        self.getSingleAlbum(),
      ]).then((res) => {
        const album = res[0].data,
          { tracks } = album,
          trackCount = tracks.total,
          releaseDate = new Date(album.release_date),
          stageImage = album.images[0].url;

        self.data.album = album;
        // init stage
        self.setStage({
          image: stageImage,
          subtitle: album.album_type,
          title: album.name,
          profile: album.artists[0],
          buttons: {
            playall: true,
            save: true,
            share: true,
          },
          info: [{
            value: releaseDate.toLocaleDateString(),
            subtitle: self.$t('released'),
          },
          {
            value: trackCount,
            subtitle: self.$tc('track', trackCount > 1 ? 0 : 1),
          },
          ],
        });
        self.$endLoading('data');
      });
    },

    // get album from the api
    getSingleAlbum() {
      const self = this,
        { market } = self;

      return self.$spotifyApi({
        method: 'get',
        url: `/albums/${self.$route.params.id}`,
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
