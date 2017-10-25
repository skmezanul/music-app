<template lang="pug">
main.main-container(v-if='!$isLoading("data")')
	// stage
	ma-stage(
    :subtitle='$t("library")',
    :title='$t("recentlyplayed")',
    :image='data.history[0].track.album.images[0].url')

	.page-container
		// tracks
		ma-section

			ol.list
				ma-list(
          v-for='(history, index) in data.history',
          :key='history.track.id',
          :type='history.track.type',
          :image='history.track.album.images[0].url',
          :title='history.track.name',
          :trackid='history.track.id',
          :artists='history.track.artists',
          :album='history.track.album',
          :explicit='history.track.explicit',
          :duration='history.track.duration_ms',
          :index='index')
</template>

<script>
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
    this.$startLoading('data');
    this.fetchData();
  },
  methods: {
    fetchData() {
      const that = this;

      that.axios.all([
          that.getHistory(),
        ]).then((res) => {
          that.data.history = res[0].data.items;
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
