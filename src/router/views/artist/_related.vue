<template lang="pug">
.page-container
	// related artists
	ma-section(:title='`${$t("relatedto")} ${$parent.artist.name}`', :collapsible='true')
		.section-items-container
			ma-item(v-for='artist in related', :type='artist.type', :key='artist.id', :image='artist.images[1].url', :title='artist.name', :primaryid='artist.id')
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
      this.axios({
        method: 'get',
        url: `/artists/${this.$route.params.id}/related-artists`,
      }).then((res) => {
        this.related = res.data.artists;
      }).catch(() => {
        this.$router.go(-1);
        this.$store.commit('ADD_NOTICE', this.$t('errors.fetchrelatedartists'));
      });
    },
  },
};
</script>
