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
  <span v-if="searchQuery.length > 0 && countResults > 0">
    <!--If artists found-->
    <div class="search-section artists" v-if="artistsResults.length > 0">
      <h1>Artists ({{artistsResults.length}})</h1>
      <div class="search-item" v-for="artist in artistsResults" :key="artist.id" @click="selectItem(artist.subtitle)">
        <div class="image-container">
          <img :src="artist.image" :alt="artist.subtitle" />
        </div>
        <div class="meta-container">
        <h4>{{artist.title}}</h4>
      </div>
      </div>
    </div>
    <!--If tracks found-->
    <div class="search-section tracks" v-if="tracksResults.length > 0">
      <h1>Tracks ({{tracksResults.length}})</h1>
      <div class="search-item" v-for="track in tracksResults" :key="track.id" @click="selectItem(track.title)">
        <div class="image-container">
          <img :src="track.image" :alt="track.title" />
        </div>
        <div class="meta-container">
        <h4>{{track.title}}</h4>
        <a>{{track.subtitle}}</a>
      </div>
      </div>
    </div>
  </span>

</div>
</template>

<script>
export default {
  data() {
    return this.$store.state.singles
  },
  props: [
    'searchQuery'
  ],
  computed: {
    artistsResults: function() {
      return this.findBy(this.singles, this.searchQuery, 'title')
    },
    tracksResults: function() {
      return this.findBy(this.singles, this.searchQuery, 'title')
    },
    countResults: function() {
      return this.artistsResults.length + this.tracksResults.length
    }
  },
  methods: {
    findBy: function(list, value, column) {
      return list.filter(function(item) {
        return item[column].includes(value)
      })
    },
    selectItem: function(event) {
      console.log(event)
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
                &:hover {
                    cursor: pointer;
                    background-color: rgba($white, 0.15);
                    box-shadow: $shadow-highlight;
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
