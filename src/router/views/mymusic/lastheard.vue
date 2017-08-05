<template>
<main class="main-container">

  <!--Stage-->
  <stage
  type="My Music"
  title="Last heard"
  :image="lastheard[0].track.album.images[0].url"
  ></stage>

  <div class="page-container">

    <section class="page-section lastheard">
      <ol class="flex-table">
        <flextable
        v-for="(lastheard, index) in lastheard"
        :key="lastheard.track.id"
        :type="lastheard.track.type"
        :image="lastheard.track.album.images[0].url"
        :title="lastheard.track.name"
        :artists="lastheard.track.artists"
        :album="lastheard.track.album"
        :duration="lastheard.track.duration_ms"
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
      lastheard: {},
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
      spotifyApi.getMyRecentlyPlayedTracks()
        .then((response) => {
          this.lastheard = response.items;
          this.$endLoading('fetching data');
        });
    },
  },
};
</script>
