<template>
<main class="main-container">

  <!--Stage-->
  <stage
  :type="$store.state.artist.type"
  :navigation="navigation"
  :image="$store.state.artist.images[0].url"
  :title="$store.state.artist.name"
  :primaryInfo="$store.state.artist.genres[0]"
  :secondaryInfo="$store.state.artist.followers.total+' Followers'"
  ></stage>

  <!--Router View-->
  <router-view></router-view>

</main>
</template>
<script>
import spotifyApi from '../../../api/'

export default {
  data() {
    return {
      navigation: [{
          title: 'Overview',
          link: ''
        },
        {
          title: 'Concerts',
          link: 'concerts'
        },
        {
          title: 'Similar Artists',
          link: 'similar'
        },
        {
          title: 'Information',
          link: 'information'
        }
      ]
    }
  },
  beforeRouteEnter(to, from, next) {
    spotifyApi.getArtist(to.params.id, (err, response) => {
      next(vm => vm.setData(err, response))
    })
  },
  beforeRouteUpdate(to, from, next) {
    spotifyApi.getArtist(to.params.id, (err, response) => {
      this.setData(err, response)
      next()
    })
  },
  methods: {
    setData(err, response) {
      if (err) {
        console.log(err.toString())
      } else {
        this.$store.commit('artistInfo', response)
      }
    }
  }
}
</script>
