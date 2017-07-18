<template>
<div class="search-container">

  <!--If user has not typed anything in-->
  <span v-if="searchQuery.length === 0">
    <i class="material-icons">search</i>
    <h2>Search for artists, tracks or albums.</h2>
  </span>

  <!--If no results for this search-->
  <span v-if="searchQuery.length > 0 && countResults === 0">
    <i class="material-icons">search</i>
    <h2>No results found for "{{ searchQuery }}".</h2>
  </span>

  <!--If results for this search-->
  <span v-if="searchQuery.length > 0 && countResults.length > 0">
    <!--If artists found-->
    <div class="search-section artists" v-if="artists.length > 0">
      <h1>Artists ({{ artists.length }})</h1>
      <div class="search-item" v-for="artist in artists" :key="artist.id">
        <router-link :to="'/artist/'+artist.id"></router-link>
        <div class="image-container">
          <img :src="artist.images[0].url" :alt="artist.name" />
        </div>
        <div class="meta-container">
        <h4>{{ artist.name }}</h4>
      </div>
      </div>
    </div>
    <!--If tracks found-->
    <div class="search-section tracks" v-if="tracks.length > 0">
      <h1>Tracks ({{ tracks.length }})</h1>
      <div class="search-item" v-for="track in tracks" :key="track.id">
        <router-link :to="'/track/'+track.id"></router-link>
        <div class="image-container">
          <img :src="track.album.images[1].url" :alt="track.name" />
        </div>
        <div class="meta-container">
        <h4>{{track.name}}</h4>
        <router-link :to="'/artist/'+track.artists[0].id">{{ track.artists[0].name }}</router-link>
      </div>
      </div>
    </div>
  </span>

</div>
</template>

<script>
import spotifyApi from '../api/'

export default {
  data() {
    return {
      artists: 0,
      tracks: 0
    }
  },
  created() {
    // fetch the data when the view is created and the data is
    // already being observed
    this.fetchData()
  },
  props: [
    'searchQuery'
  ],
  computed: {
    countResults() {
      return this.artists + this.tracks
    }
  },
  watch: {
    // call again the method if the prop changes
    '$props': 'fetchData'
  },
  methods: {
    fetchData() {
      spotifyApi.searchArtists(this.searchQuery)
        .then(response => this.artists = response.artists.items)
      spotifyApi.searchTracks(this.searchQuery)
      .then(response => this.tracks = response.tracks.items)
    }
  }
}
</script>

<style lang="scss">
.search-container {
    span {
        display: flex;
        justify-content: center;
        flex-direction: column;
        align-items: center;
        i {
            font-size: 4em;
            color: rgba($white, 0.7);
        }
        h2 {
            text-align: center;
            font-size: 1em;
            margin-top: 15px;
        }
        .search-section {
            width: 100%;
            &:first-of-type {
                h1 {
                    margin-top: 0;
                }
            }
            h1 {
                margin: 40px 0 20px;
            }
            .search-item {
                background-color: $blue;
                margin-bottom: 3px;
                display: flex;
                align-items: center;
                box-shadow: $shadow;
                transition: background-color 0.3s, box-shadow 0.3s;
                position: relative;
                &:hover {
                    background-color: rgba($white, 0.15);
                    box-shadow: $shadow-highlight;
                }

                a {
                    position: absolute;
                    top: 0;
                    left: 0;
                    right: 0;
                    bottom: 0;
                }

                .image-container {
                    height: 60px;
                    width: 60px;
                    overflow: hidden;
                    img {
                        height: 100%;
                        width: 100%;
                    }
                }
                .meta-container {
                    margin: 0 15px;
                    white-space: nowrap;
                    overflow: hidden;
                    line-height: 1.3em;
                    h4 {
                        font-size: 1.1em;
                    }
                    a {
                        @include comma-separated(1em, 300);
                    }
                }
            }
        }
    }
}
</style>
