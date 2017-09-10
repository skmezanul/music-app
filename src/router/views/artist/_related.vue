<template lang="pug">
.page-container
	// related artists
	ma-section(
    :title='`${$t("relatedto")} ${$parent.artist.name}`',
    :collapsible='true')

		.section-items-container
			ma-item(
        v-for='artist in related',
        :type='artist.type',
        :key='artist.id',
        :image='artist.images[1].url',
        :title='artist.name',
        :primaryid='artist.id')
</template>

<script>
export default {
  data() {
    return {
      related: [],
    };
  },
  created() {
    // fetch the data when the view is created and the data is
    // already being observed
    this.getRelatedArtists();
  },
  methods: {
    // get artists related to this artist from the api
    getRelatedArtists() {
      const that = this;

      that.axios({
        method: 'get',
        url: `/artists/${that.$route.params.id}/related-artists`,
      }).then((res) => {
        that.related = res.data.artists;
      });
    },
  },
};
</script>
