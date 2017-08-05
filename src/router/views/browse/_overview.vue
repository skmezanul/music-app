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
import spotifyApi from '../../../api/';

export default {
  data() {
    return {
      featured: {},
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
  },
  methods: {
    fetchData() {
      // Get this artist's albums from the api
      spotifyApi.getFeaturedPlaylists()
        .then(response => this.featured = response);
    },
  },
};
</script>
