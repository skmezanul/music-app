<template>
<div class="page-container">
  <section class="page-section playlists">
    <div class="section-header">
      <h1>Playlists</h1>
      <div class="section-actions">
        <span>Show Less<i class="material-icons">keyboard_arrow_up</i></span>
      </div>
    </div>
    <div class="section-items-container">
      <sectionitem v-for="playlist in singles" type="playlist" :key="playlist.id" :image="playlist.image" :title="playlist.title" :subtitle="playlist.subtitle"></sectionitem>
    </div>
  </section>
</div>
</template>
<script>
import spotifyApi from '../../../api/'

export default {
  data() {
    return {
      playlists: {}
    }
  },
  created() {
    // fetch the data when the view is created and the data is
    // already being observed
    this.fetchData()
  },
  watch: {
    // call again the method if the route changes
    '$route': 'fetchData'
  },
  methods: {
    fetchData() {
      spotifyApi.getArtistPlaylists(this.$route.params.id)
        .then(response => this.playlists = response.items)
    }
  }
}
</script>
