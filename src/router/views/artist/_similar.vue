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
import spotifyApi from '../../../api/'

export default {
  data() {
    return {
      similar: {}
    }
  },
  beforeRouteEnter(to, from, next) {
    spotifyApi.getArtistRelatedArtists(to.params.id, (err, response) => {
      next(vm => vm.similar = response.artists)
    })
  },
  beforeRouteUpdate(to, from, next) {
    spotifyApi.getArtistRelatedArtists(to.params.id, (err, response) => {
      this.similar = response.artists
      next()
    })
  }
}
</script>
