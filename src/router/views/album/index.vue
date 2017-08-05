<template>
<main class="main-container">

  <!--Stage-->
  <stage
  :type="album.type"
  :image="album.images[0].url"
  :title="album.name"
  :primaryInfo="'By '+album.artists[0].name"
  :secondaryInfo="'Released '+album.release_date"
  ></stage>

  <div class="page-container">

    <section class="page-section tracks">
      <ol class="flex-table">
        <flextable
        v-for="(track, index) in album.tracks.items"
        :key="track.id"
        :type="track.type"
        :title="track.name"
        :duration="track.duration_ms"
        :index="index"
        ></flextable>
      </ol>
    </section>

  </div>

</main>
</template>
<script>
import spotifyApi from '../../../api/';

export default {
  data() {
    return {
      album: {},
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
      this.$startLoading('fetching data');
      // Get this playlist's tracks
      spotifyApi.getAlbum(this.$route.params.id)
        .then((response) => {
          this.album = response;
          this.$endLoading('fetching data');
        });
    },
  },
};
</script>
