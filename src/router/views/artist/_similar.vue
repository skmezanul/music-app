<template lang="pug">
.page-container
	ma-section(:title='`Similar to ${$parent.artist.name}`', :collapsible='false')
		.section-items-container
			ma-item(v-for='artist in similar', :type='artist.type', :key='artist.id', :image='artist.images[1].url', :title='artist.name', :primaryid='artist.id')
</template>
<script>
export default {
  data() {
    return {
      similar: [],
    };
  },
  created() {
    // fetch the data when the view is created and the data is
    // already being observed
    this.getSimilarArtists();
  },
  methods: {
    // get artists similar to this artist from the api
    getSimilarArtists() {
      this.axios({
        method: 'get',
        url: `/artists/${this.$route.params.id}/related-artists`,
      }).then((res) => {
        this.similar = res.data.artists;
      }).catch((err) => {
        this.$store.commit('ADD_NOTICE', `Similar artists could not be fetched, please try again later. ${err}`);
        this.similar = [];
      });
    },
  },
};
</script>
