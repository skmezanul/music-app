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
  <span v-if="searchQuery.length > 0">
    <!--If artists found-->
    <div class="search-section artists" v-if="results.artists.items.length > 0">
      <h1>Artists ({{ results.artists.items.length }})</h1>
      <div class="search-item" v-for="artist in results.artists.items" :key="artist.id" @click="toTarget(artist.type, artist.id)">
        <div class="image-container">
          <img :src="artist.images[0].url" :alt="artist.name" />
        </div>
        <div class="meta-container">
        <h4>{{ artist.name }}</h4>
      </div>
      </div>
    </div>


    <!--If tracks found-->
    <div class="search-section tracks" v-if="results.tracks.items.length > 0">
      <h1>Tracks ({{ results.tracks.items.length }})</h1>
      <div class="search-item" v-for="track in results.tracks.items" :key="track.id" @click="toTarget(track.type, track.id)">
        <div class="image-container">
          <img :src="track.album.images[1].url" :alt="track.name" />
        </div>
        <div class="meta-container">
        <h4>{{track.name}}</h4>
        <a class="artist" v-for="artist in track.artists" @click="toArtist(artist.type, artist.id)">{{ artist.name }}</a>
      </div>
      </div>
    </div>

    <!--If albums found-->
    <div class="search-section albums" v-if="results.albums.items.length > 0">
      <h1>Albums ({{ results.albums.items.length }})</h1>
      <div class="search-item" v-for="album in results.albums.items" :key="album.id" @click="toTarget(album.type, album.id)">
        <div class="image-container">
          <img :src="album.images[1].url" :alt="album.name" />
        </div>
        <div class="meta-container">
        <h4>{{album.name}}</h4>
        <a class="artist" v-for="artist in album.artists" @click="toArtist(artist.type, artist.id)">{{ artist.name }}</a>
      </div>
      </div>
    </div>

  </span>

</div>
</template>

<script>
import spotifyApi from '../api/'
import router from '../router'

export default {
  data() {
    return {
      results: {}
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
      return
    }
  },
  watch: {
    // call again the method if the prop changes
    'searchQuery': 'fetchData'
  },
  methods: {
    fetchData() {
      spotifyApi.search(this.searchQuery, ['album', 'artist', 'track'])
        .then(response => this.results = response)
    },
    toTarget(type, target) {
      router.push({
        path: '/' + type + '/' + target
      })
    },
    toArtist(type, artistID) {
      router.push({
        path: '/' + type + '/' + artistID
      })
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
                    cursor: pointer;
                }

                .image-container {
                    height: 60px;
                    width: 60px;
                    min-width: 60px;
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
