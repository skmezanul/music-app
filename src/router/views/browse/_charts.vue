<template lang="pug">
.page-container
	// charts
	ma-section(:title='$t("charts")')

		ol.list
			ma-list(
        v-for='(item, index) in charts',
        :key='item.track.id',
        :type='item.track.type',
        :image='item.track.album.images[0].url',
        :title='item.track.name',
        :trackid='item.track.id',
        :artists='item.track.artists',
        :album='item.track.album',
        :explicit='item.track.explicit',
        :duration='item.track.duration_ms',
        :index='index')
</template>

<script>
export default {
  data() {
    return {
      charts: [],
    };
  },
  created() {
    // fetch the data when the view is created and the data is
    // already being observed
    this.getCharts();
  },
  methods: {
    // get charts from the api
    getCharts() {
      const that = this;

      that.axios({
        method: 'get',
        url: '/users/spotifycharts/playlists/37i9dQZEVXbMDoHDwVN2tF',
      }).then((res) => {
        that.charts = res.data.tracks.items;
      });
    },
  },
};
</script>
