<template>
<div class="page-container similar">
  <section class="page-section">
    <div class="section-header">
      <h1>Similar to {{ $parent.artist.name }}</h1>
    </div>
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
  </section>
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
    this.fetchData();
  },
  watch: {
    // call again the method if the route changes
    $route: 'fetchData',
    $parent: 'fetchData',
  },
  methods: {
    fetchData() {
      // get artists similar to this artist from the api
      this.axios({
        method: 'get',
        url: `/artists/${this.$route.params.id}/related-artists`,
      }).then((res) => {
        this.similar = res.data.artists;
      }).catch(() => {
        this.$store.commit('error', 'Similar artists could not be fetched, please try again later.');
        this.similar = [];
      });
    },
  },
};
</script>
