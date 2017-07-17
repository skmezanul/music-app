<template>
<main class="main-container" :class="{ 'stage-compact': $route.meta.header === 'compact' }">

  <!--Stage-->
  <div class="stage">

    <!--Background-->
    <div class="stage-background">
      <parallax :speedFactor="0.3">
        <img :src="$store.state.album.images[0].url" :alt="$store.state.album.name" />
      </parallax>
    </div>

    <div class="stage-inner">

      <!--Content-->
      <div class="stage-container">
        <h2>Album</h2>
        <h1>{{ $store.state.album.name }}</h1>
        <div class="info">
          <a>By {{ $store.state.album.artists[0].name }}</a><a>Released {{ $store.state.album.release_date }}</a>
        </div>
        <div class="button-container">
          <div class="button-group">
            <a class="btn btn-accent"><i class="material-icons">play_circle_filled</i>Play All</a>
            <a class="btn btn-icon"><i class="material-icons">favorite</i></a>
          </div>
          <a class="btn btn-transparent"><i class="material-icons">share</i>Share</a>
        </div>
      </div>

    </div>

  </div>

  <!--Router View-->
  <router-view></router-view>

</main>
</template>
<script>
import spotifyApi from '../../../api/'

export default {
  beforeRouteEnter (to, from, next) {
    spotifyApi.getAlbum(to.params.id, (err, response) => {
      next(vm => vm.setData(err, response))
    })
  },
  beforeRouteUpdate (to, from, next) {
    spotifyApi.getAlbum(to.params.id, (err, response) => {
      this.setData(err, response)
      next()
    })
  },
  methods: {
    setData (err, response) {
      if (err) {
        console.log(err.toString())
      } else {
        this.$store.commit('albumInfo', response)
      }
    }
  }
}
</script>
