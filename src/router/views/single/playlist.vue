<template lang='pug'>
.view-parent
	// stage
	ma-stage(v-show='!$isLoading("data")')

	.view-content(v-if='!$isLoading("data")')
		// playlists
		ma-section

			ol.list
				ma-list(
					v-for='(playlist, index) in data.playlist.tracks.items',
					:key='index',
					:trackid='playlist.track.id',
					:type='playlist.track.type',
					:image='playlist.track.album.images',
					:title='playlist.track.name',
					:artists='playlist.track.artists',
					:album='playlist.track.album',
					:explicit='playlist.track.explicit',
          :popularity='playlist.track.popularity',
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
        const playlist = res[0].data,
          { tracks } = playlist,
          trackCount = tracks.total,
          followerCount = playlist.followers.total,
          stageImage = playlist.images[0].url;

        self.data.playlist = playlist;
        // init stage
        self.setStage({
          image: stageImage,
          subtitle: self.$tc('playlist', 1),
          title: playlist.name,
          profile: playlist.owner,
          meta: playlist.description,
          buttons: {
            playall: true,
            save: true,
          },
          info: [{
            value: trackCount,
            subtitle: self.$tc('track', trackCount === 1 ? 1 : 0),
          },
          {
            value: followerCount.toLocaleString(),
            subtitle: self.$tc('follower', followerCount === 1 ? 1 : 0),
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
