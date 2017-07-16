<template>
<div class="page-container similar">
  <section class="page-section">
    <div class="section-header">
      <h1>Similar to {{ $store.state.artist.name }}</h1>
    </div>
    <div class="section-items-container">
      <sectionitem v-for="item in similar" type="artist" :key="item.name" :image="item.images[1].url" :title="item.name" :subtitle="item.genres[0]" :id="item.id">
      </sectionitem>
    </div>
  </section>
</div>
</template>
<script>
import spotifyApi from '../../../api/'

export default {
  data() {
    return {
      similar: null
    }
  },
  created() {
    spotifyApi.getArtistRelatedArtists(this.$route.params.id)
      .then(response => this.similar = response.artists)
  }
}
</script>
