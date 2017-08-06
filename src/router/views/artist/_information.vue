<template>
<div class="page-container">
  <section class="page-section information">
    <div class="section-header">
      <h1>About {{ this.$parent.artist.name }}</h1>
    </div>
    <p v-show="biography != null" class="biography" v-html="biography">

      <!--Insert Biography-->

    </p>
  </section>
</div>
</template>
<script>
export default {
  data() {
    return {
      biography: null,
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
      // get this artist's biography
      this.axios({
        method: 'get',
        baseURL: 'http://ws.audioscrobbler.com/2.0/',
        url: `/?method=artist.getInfo&api_key=5ee365767f401c005a08f2ef9a92b66c&artist=${this.$parent.artist.name}&limit=5&autocorrect=1&format=json`,
      }).then((res) => {
        this.biography = res.data.artist.bio.content;
      }).catch(() => {
        this.$store.commit('error', 'Biography could not be fetched, please try again later.');
        this.biography = null;
      });
    },
  },
};
</script>
