<template lang="pug">
.view-parent
	// stage
	ma-stage(v-show='!$isLoading("data")')

	.view-content(v-if='!$isLoading("data")')
		// tracks
		ma-section(:copyright='data.album.copyrights[0].text')

			ol.list
				ma-list(
          v-for='(track, index) in data.album.tracks.items',
          :key='track.id',
          :type='track.type',
          :title='track.name',
          :trackId='track.id',
          :explicit='track.explicit',
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
        const releaseDate = new Date(res[0].data.release_date);

        self.data.album = res[0].data;
        // init stage
        self.setStage({
          image: res[0].data.images[0].url,
          subtitle: res[0].data.album_type,
          title: res[0].data.name,
          profile: res[0].data.artists[0],
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
            value: res[0].data.tracks.total,
            subtitle: self.$tc('track', 0),
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
