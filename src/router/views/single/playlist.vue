<template lang="pug">
.view-parent
	// stage
	ma-stage(v-show='!$isLoading("data")')

	.view-content(v-if='!$isLoading("data")')
		// playlists
		ma-section

			ol.list
				ma-list(
					v-for='(playlist, index) in data.playlist.tracks.items',
					:key='playlist.track.id',
					:trackId='playlist.track.id',
					:type='playlist.track.type',
					:image='playlist.track.album.images',
					:title='playlist.track.name',
					:artists='playlist.track.artists',
					:album='playlist.track.album',
					:explicit='playlist.track.explicit',
					:duration='playlist.track.duration_ms',
					:index='index')
</template>

<script>
import { mapGetters, mapMutations } from 'vuex';

export default {
  data() {
    return {
      data: {
        playlist: [],
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
        self.getSinglePlaylist(),
      ]).then((res) => {
        self.data.playlist = res[0].data;
        // init stage
        self.setStage({
          image: res[0].data.images[0].url,
          subtitle: self.$tc('playlist', 1),
          title: res[0].data.name,
          profile: res[0].data.owner,
          meta: res[0].data.description,
          buttons: {
            playall: true,
            save: true,
            share: true,
          },
          info: [{
              value: res[0].data.tracks.total,
              subtitle: self.$tc('track', 0),
            },
            {
              value: res[0].data.followers.total.toLocaleString(),
              subtitle: self.$tc('follower', 0),
            },
          ],
        });
        self.$endLoading('data');
      });
    },

    // get playlist from the api
    getSinglePlaylist() {
      const self = this,
        { market } = self,
        { owner, id } = self.$route.params;

      return self.$spotifyApi({
        method: 'get',
        url: `/users/${owner}/playlists/${id}`,
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
