<template>
<div class="search-container">

  <!--If user has not typed anything in-->
  <span v-if="searchQuery.length === 0">
    <i class="material-icons">search</i>
    <h2>Search for artists, tracks or albums.</h2>
  </span>

  <!--If no results for this search-->
  <span v-if="countResults === 0">
    <i class="material-icons">search</i>
    <h2>No results found for "{{ searchQuery }}".</h2>
  </span>

  <!--If results for this search-->
  <span v-show="searchQuery.length > 0 && countResults.length > 0">
    <!--If artists found-->
    <div class="search-section artists" v-show="artistsResults > 0">
      <h1>Artists ({{ artistsResults }})</h1>
      <div class="search-item" v-for="artist in artists" :key="artist.mbid">
        <router-link :to="'/artist/'+artist.name"></router-link>
        <div class="image-container">
          <img :src="artist.image[1]['#text']" :alt="artist.name" />
        </div>
        <div class="meta-container">
        <h4>{{artist.name}}</h4>
      </div>
      </div>
    </div>
    <!--If tracks found-->
    <div class="search-section tracks" v-show="tracksResults > 0">
      <h1>Tracks ({{ tracksResults }})</h1>
      <div class="search-item" v-for="track in artists" :key="track.id">
        <router-link :to="'/track/'+track.title"></router-link>
        <div class="image-container">
          <img src="https://i.scdn.co/image/7ebfd980c297445443953f9b8073a2492f2daad4" :alt="track.title" />
        </div>
        <div class="meta-container">
        <h4>{{track.title}}</h4>
        <router-link :to="'/artist/'+track.subtitle">{{track.subtitle}}</router-link>
      </div>
      </div>
    </div>
  </span>

</div>
</template>

<script>
import axios from 'axios'

export default {
  data() {
    return {
      artists: {},
      tracks: {},
      userSearch: this.searchQuery
    }
  },
  props: [
    'searchQuery'
  ],
  computed: {
    countResults() {
      return this.artists + this.tracks
    },
    artistsResults() {
      return this.artists.length
    },
    tracksResults() {
      return this.tracks.length
    }
  },
  created() {
    axios.get(`http://ws.audioscrobbler.com/2.0/?method=artist.search&api_key=5ee365767f401c005a08f2ef9a92b66c&artist=${this.userSearch}&limit=5&format=json`)
      .then(response => this.artists = response.data.results.artistmatches.artist)
      .catch(error => console.log(error))
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
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    img {
                        height: 100%;
                        width: auto;
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
