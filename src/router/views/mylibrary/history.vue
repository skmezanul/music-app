<template lang="pug">
.view-parent
	// stage
	ma-stage(v-show='!$isLoading("data")')

	.view-content(v-if='!$isLoading("data")')
		// tracks
		ma-section

			ol.list
				ma-list(
          v-for='(history, index) in data.history',
          :key='history.track.id',
          :type='history.track.type',
          :image='history.track.album.images',
          :title='history.track.name',
          :trackid='history.track.id',
          :artists='history.track.artists',
          :album='history.track.album',
          :explicit='history.track.explicit',
          :duration='history.track.duration_ms',
          :index='index')
</template>

<script>
import { mapMutations } from 'vuex';

export default {
  data() {
    return {
      data: {
        history: [],
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
          that.getHistory(),
        ]).then((res) => {
          that.data.history = res[0].data.items;
          // init stage
          that.setStage({
            image: res[0].data.items[0].track.album.images[0].url,
            subtitle: that.$t('library'),
            title: that.$t('recentlyplayed'),
            buttons: [{
                title: 'playall',
                icon: 'play_circle_filled',
              },
            ],
          });
          that.$endLoading('data');
        });
    },

    // get get this user's history from the api
    getHistory() {
      const that = this;

      return that.$spotifyApi({
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
