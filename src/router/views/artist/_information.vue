<template>
<div class="page-container">
  <section class="page-section information">
    <div class="section-header">
      <h1>About {{ $store.state.artist.name }}</h1>
    </div>
    <p class="biography" v-html="biography">

      <!--Insert Biography-->

    </p>
  </section>
</div>
</template>
<script>
import axios from 'axios'

export default {
  data() {
    return {
      biography: {}
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
      axios.get(`http://ws.audioscrobbler.com/2.0/?method=artist.getInfo&api_key=5ee365767f401c005a08f2ef9a92b66c&artist=${this.$store.state.artist.name}&limit=5&autocorrect=1&format=json`)
        .then(response => this.biography = response.data.artist.bio.content)
        .catch(function (error) { this.biography = 'No biography available for this artist.' });
    }
  }
}
 </script>
