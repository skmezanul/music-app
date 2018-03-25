<template lang='pug'>
.view-parent
	// stage
	ma-stage(v-show='!$isLoading("data")')

	.view-content(v-if='!$isLoading("data")')
		// tracks
		ma-section

			ol.list
				ma-list(
          v-for='(history, index) in data.history',
          :key='`${history.track.id}-${index}`',
          :type='history.track.type',
          :image='history.track.album.images',
          :title='history.track.name',
          :trackId='history.track.id',
          :artists='history.track.artists',
          :album='history.track.album',
          :explicit='history.track.explicit',
          :popularity='history.track.popularity',
          :duration='history.track.duration_ms',
          :index='index')
</template>

<script>
import { mapMutations } from 'vuex';

export default {

  data: () => ({
    data: {
      history: [],
    },
  }),

  created() {
    // fetch the data when the view is created and the data is
    // already being observed
    this.fetchData();
  },

  methods: {
    ...mapMutations('app', {
      setStage: 'SET_STAGE',
    }),

    fetchData() {
      const self = this;
      self.$startLoading('data');

      self.axios.all([
        self.getHistory(),
      ]).then((res) => {
        const history = res[0].data.items,
          stageImage = history[0].track.album.images[0].url;

        self.data.history = history;
        // init stage
        self.setStage({
          image: stageImage,
          subtitle: self.$t('library'),
          title: self.$t('recentlyplayed'),
          buttons: {
            playall: true,
          },
        });
        self.$endLoading('data');
      });
    },

    // get get this user's history from the api
    getHistory() {
      const self = this;

      return self.$spotifyApi({
        method: 'get',
        url: '/me/player/recently-played',
        params: {
          type: 'track',
        },
      });
    },
  },

};
</script>
