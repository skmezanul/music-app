<template>
<main class="main-container" :class="{ 'stage-compact': $route.meta.header === 'compact' }">

  <!--Stage-->
  <stage :type="$store.state.album.type"
  :image="$store.state.album.album.images[0].url"
  :title="$store.state.album.name"
  :primaryinfo="$store.state.album.description"
  ></stage>

  <!--Router View-->
  <router-view></router-view>

</main>
</template>
<script>
import spotifyApi from '../../../api/'

export default {
  beforeRouteEnter(to, from, next) {
    spotifyApi.getPlaylist(to.params.user, to.params.id, (err, response) => {
      next(vm => vm.setData(err, response))
    })
  },
  beforeRouteUpdate(to, from, next) {
    spotifyApi.getPlaylist(to.params.user, to.params.id, (err, response) => {
      this.setData(err, response)
      next()
    })
  },
  methods: {
    setData(err, response) {
      if (err) {
        console.log(err.toString())
      } else {
        this.$store.commit('albumInfo', response)
      }
    }
  }
}
</script>
