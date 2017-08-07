<template>
<div class="page-container">

  <pagesection :title="`Similar to ${$parent.artist.name}`" :collapsible="false">
    <div class="section-items-container">
      <sectionitem
      v-for="artist in similar"
      :type="artist.type"
      :key="artist.id"
      :image="artist.images[1].url"
      :title="artist.name"
      :primaryID="artist.id"
      ></sectionitem>
    </div>
  </pagesection>

</div>
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
