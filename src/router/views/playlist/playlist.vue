<template>
<main class="main-container">

  <!--Stage-->
  <stage :type="playlist.type" :image="playlist.images[0].url" :title="playlist.name" :primaryInfo="playlist.description"></stage>

  <div class="page-container">

    <section class="page-section tracks">
      <ol class="flex-table">
        <flextable v-for="(playlist, index) in playlist.tracks.items" :key="playlist.track.id" :type="playlist.track.type" :image="playlist.track.album.images[0].url" :title="playlist.track.name" :artists="playlist.track.artists" :album="playlist.track.album"
          :duration="playlist.track.duration_ms" :index="index"></flextable>
      </ol>
    </section>

  </div>

</main>
</template>
<script>
import spotifyApi from '../../../api/'

export default {
  data() {
    return {
      playlist: {}
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
      this.$startLoading('fetching data')
      // Get this playlist's tracks
      spotifyApi.getPlaylist(this.$route.params.user, this.$route.params.id)
        .then((response) => {
          this.playlist = response
          this.$endLoading('fetching data')
        })
    }
  }
}
</script>
