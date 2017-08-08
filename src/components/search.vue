<template lang="pug">
.search-container
	// If user has not typed anything in
	span(v-if='searchQuery.length === 0')
		i.material-icons search
		h2 Search for artists, tracks or albums.
	// if no results for this search
	span(v-if='searchQuery.length > 0 && countResults === 0')
		i.material-icons search
		h2 No results found for "{{ searchQuery }}".
	// if results for this search
	span(v-if='searchQuery.length > 0')
		// if artists found
		.search-section.artists(v-if='results.artists.items.length > 0')
			h1 Artists ({{ results.artists.items.length }})
			.search-item(v-for='artist in results.artists.items', :key='artist.id', @click='toTarget(artist.type, artist.id)')
				.image-container
					img(:src='artist.images[0].url', :alt='artist.name')
				.meta-container
					h4 {{ artist.name }}
		// if tracks found
		.search-section.tracks(v-if='results.tracks.items.length > 0')
			h1 Tracks ({{ results.tracks.items.length }})
			.search-item(v-for='track in results.tracks.items', :key='track.id', @click='toTarget(track.type, track.id)')
				.image-container
					img(:src='track.album.images[1].url', :alt='track.name')
				.meta-container
					h4 {{track.name}}
					a.artist(v-for='artist in track.artists', @click='toArtist(artist.type, artist.id)') {{ artist.name }}
		// if albums found
		.search-section.albums(v-if='results.albums.items.length > 0')
			h1 Albums ({{ results.albums.items.length }})
			.search-item(v-for='album in results.albums.items', :key='album.id', @click='toTarget(album.type, album.id)')
				.image-container
					img(:src='album.images[1].url', :alt='album.name')
				.meta-container
					h4 {{album.name}}
					a.artist(v-for='artist in album.artists', @click='toArtist(artist.type, artist.id)') {{ artist.name }}
</template>

<script>
export default {
  data() {
    return {
      results: [],
    };
  },
  created() {
    // fetch the data when the view is created and the data is
    // already being observed
    this.getResults();
  },
  props: [
    'searchQuery',
  ],
  methods: {
    // get results for this search query from the api
    getResults() {
      this.axios({
        method: 'get',
        url: '/search',
        params: {
          q: this.searchQuery,
          type: 'album,artist,track',
        },
      }).then((res) => {
        this.results = res.data;
      }).catch((err) => {
        this.$store.commit('ADD_NOTICE', `Search was not successful, please try again later. ${err}`);
        this.results = [];
      });
    },

    // navigate to detail view after clicked on item
    toTarget(type, target) {
      this.$router.push({
        path: `/${type}/${target}`,
      });
    },

    // navigate to artist view after clicked on artist
    toArtist(type, artistID) {
      this.$router.push({
        path: `/${type}/${artistID}`,
      });
    },
  },
};
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
