<template lang="pug">
main.main-container
	// stage
	ma-stage(
    :subtitle='$t("library")',
    :title='$t("recentlyplayed")',
    :image='history[0].track.album.images[0].url')

	.page-container
		// tracks
		ma-section(:collapsible='false')

			ol.list
				ma-list(
          v-for='(history, index) in history',
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
      history: [],
    };
  },
  created() {
    // fetch the data when the view is created and the data is
    // already being observed
    this.getHistory();
  },
  methods: {
    // get get this user's history from the api
    getHistory() {
      const that = this;

      that.$startLoading('fetching data');
      that.axios({
        method: 'get',
        url: '/me/player/recently-played',
        params: {
          type: 'track',
        },
      }).then((res) => {
        that.history = res.data.items;
        that.$endLoading('fetching data');
      }).catch(() => {
        that.$router.go(-1);
        that.$endLoading('fetching data');
        that.$store.commit('ADD_NOTICE', that.$t('errors.fetchhistory'));
      });
    },
  },
};
</script>
