<template>
<div class="page-container similar">
  <section class="page-section">
    <div class="section-header">
      <h1>Similar to {{ $store.state.artist.name }}</h1>
    </div>
    <div class="section-items-container">
      <sectionitem
      v-for="artist in similar"
      :type="artist.type"
      :key="artist.name"
      :image="artist.images[1].url"
      :title="artist.name"
      :subtitle="artist.genres[0]"
      :primaryid="artist.id"
      ></sectionitem>
    </div>
  </section>
</div>
</template>
<script>
import spotifyApi from '../../../api/'

export default {
  data() {
    return {
      similar: {}
    }
  },
  created() {
    spotifyApi.getArtistRelatedArtists(this.$route.params.id)
      .then(response => this.similar = response.artists)
  }
}
</script>
