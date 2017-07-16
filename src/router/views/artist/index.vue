<template>
<main class="main-container" :class="{ 'stage-compact': $route.meta.header === 'compact' }">

  <!--Stage-->
  <div class="stage">

    <!--Background-->
    <div class="stage-background">
      <parallax :speedFactor="0.3">
        <img v-show="$route.meta.header != 'compact'" :src="$store.state.artist.image[4]['#text']" :alt="$store.state.artist.name" />
      </parallax>
    </div>

    <div class="stage-inner">

      <!--Content-->
      <div class="stage-container">
        <transition name="fade">
          <h2 v-show="$route.meta.header === 'full'">Artist</h2>
        </transition>
        <h1>{{ $store.state.artist.name }}</h1>
        <div class="genres">
          <a v-for="item in $store.state.artist.tags.tag" :href="item.url" target="_blank">{{ item.name }}</a>
        </div>
        <div class="button-container">
          <div class="button-group">
            <a class="btn btn-accent"><i class="material-icons">play_circle_filled</i>Play All</a>
            <a class="btn"><i class="material-icons">add_circle</i>Follow</a>
            <a class="btn btn-icon"><i class="material-icons">favorite</i></a>
          </div>
          <a class="btn btn-transparent"><i class="material-icons">share</i>Share</a>
        </div>
      </div>

      <!--Navigation-->
      <nav class="subnav mobile-hidden" v-in-viewport='69'>
        <ul>
          <li>
            <router-link :to="'/artist/'+$route.params.id">Overview</router-link>
          </li>
          <li>
            <router-link :to="'/artist/'+$route.params.id+'/concerts'">Concerts</router-link>
          </li>
          <li>
            <router-link :to="'/artist/'+$route.params.id+'/playlists'">Playlists</router-link>
          </li>
          <li>
            <router-link :to="'/artist/'+$route.params.id+'/feed'">Artist Feed</router-link>
          </li>
          <li>
            <router-link :to="'/artist/'+$route.params.id+'/similar'">Similar Artists</router-link>
          </li>
          <li>
            <router-link :to="'/artist/'+$route.params.id+'/information'">Information</router-link>
          </li>
        </ul>
      </nav>

    </div>

  </div>

  <!--Router View-->
  <router-view></router-view>

</main>
</template>
<script>
import axios from 'axios'

export default {
  created() {
    axios.get(`http://ws.audioscrobbler.com/2.0/?method=artist.getinfo&api_key=5ee365767f401c005a08f2ef9a92b66c&artist=${this.$route.params.id}&format=json`)
      .then(response => this.$store.commit('artistInfo', response.data.artist))
      .catch(error => console.log(error))
  }
}
</script>
