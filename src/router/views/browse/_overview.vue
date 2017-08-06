<template>
<div class="page-container">

  <section class="page-section recommended">
    <div class="section-header">
      <h1>{{ featured.message }}</h1>
      <div class="section-actions">
        <span>Show Less<i class="material-icons">keyboard_arrow_up</i></span>
      </div>
    </div>
    <div class="section-items-container">
      <sectionitem
      v-for="featured in featured.playlists.items"
      :key="featured.id"
      :type="featured.type"
      :primaryID="featured.id"
      :secondaryID="featured.owner.id"
      :image="featured.images[0].url"
      :title="featured.name"
      ></sectionitem>
    </div>

  </section>

</div>
</template>
<script>
export default {
  data() {
    return {
      featured: [],
    };
  },
  created() {
    // fetch the data when the view is created and the data is
    // already being observed
    this.getFeaturedPlaylists();
  },
  methods: {
    // get featured playlists from the api
    getFeaturedPlaylists() {
      this.$startLoading('fetching data');
      this.axios({
        method: 'get',
        url: '/browse/featured-playlists',
        params: {
          country: this.$store.state.currentUser.country,
        },
      }).then((res) => {
        this.featured = res.data;
        this.$endLoading('fetching data');
      }).catch(() => {
        this.$store.commit('notice', 'Featured playlists could not be fetched, please try again later.');
        this.featured = [];
      });
    },
  },
};
</script>
