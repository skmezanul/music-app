<template>
<div class="page-container">

  <section class="page-section tracks">
    <div class="section-header">
      <h1>Top Tracks</h1>
      <div class="section-actions">
        <span>Show Less<i class="material-icons">keyboard_arrow_up</i></span>
      </div>
    </div>
    <ol class="flex-table">
      <flextable
      v-for="(track, index) in tracks"
      :key="track.id"
      :type="track.type"
      :image="track.album.images[0].url"
      :title="track.name"
      :duration="track.duration_ms"
      :index="index"
      ></flextable>
    </ol>
  </section>

  <section class="page-section albums">
    <div class="section-header">
      <h1>Albums</h1>
      <div class="section-actions">
        <span>Show Less<i class="material-icons">keyboard_arrow_up</i></span>
      </div>
    </div>
    <div class="section-items-container">
      <sectionitem
      v-for="album in albums"
      :key="album.id"
      :type="album.type"
      :primaryID="album.id"
      :secondaryID="album.artists[0].id"
      :image="album.images[0].url"
      :title="album.name"
      :artist="album.artists"
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
      tracks: {},
      albums: {},
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
      spotifyApi.getArtistAlbums(this.$route.params.id, {
        country: this.$store.state.currentUser.country,
      })
        .then(response => this.albums = response.items);
      spotifyApi.getArtistTopTracks(this.$route.params.id, this.$store.state.currentUser.country)
        .then(response => this.tracks = response.tracks);
    },
  },
};
</script>
