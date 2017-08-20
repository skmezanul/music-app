<template lang="pug">
nav.navigation-container
	ul
		// browse
		.navigation-section
			li
				router-link(to='/browse')
					i.material-icons book
					| Browse
			li
				router-link(to='/radio')
					i.material-icons radio
					| Radio

		// my library
		.navigation-section
			li
				h4 My Library
			li
				router-link(to='/history')
					i.material-icons history
					| Recently Played
			li
				router-link(to='/songs')
					i.material-icons music_note
					| Songs
			li
				router-link(to='/albums')
					i.material-icons album
					| Albums
			li
				router-link(to='/artists')
					i.material-icons person
					| Artists

		// playlists
		transition(name='fade')
			.navigation-section(v-if='playlists.length > 0')
				li
					h4 My Playlists
				li(v-for='playlist in playlists', :key='playlist.id')
					router-link(:to='`/${playlist.type}/${playlist.owner.id}/${playlist.id}`')
						i.material-icons playlist_play
						span {{ playlist.name }}

		// new playlist
		.navigation-section
			li
				a
					i.material-icons playlist_add
					span New Playlist
</template>

<script>
export default {
  data() {
    return {
      playlists: [],
    };
  },
  created() {
    // fetch the data when the view is created and the data is
    // already being observed
    this.getMyPlaylists();
  },
  methods: {
    // get current user's playlists from the api
    getMyPlaylists() {
      this.axios({
        method: 'get',
        url: '/me/playlists',
        params: {
          limit: 10,
        },
      }).then((res) => {
        this.playlists = res.data.items;
      }).catch((err) => {
        this.$store.commit(
          'ADD_NOTICE',
          `Playlists could not be fetched, please try again later. ${err}`
        );
        this.playlists = [];
      });
    },
  },
};
</script>

<style lang="scss">
.navigation-container {
    position: fixed;
    left: 0;
    z-index: 997;
    width: 200px;
    height: 100%;
    -webkit-font-smoothing: subpixel-antialiased;

    ul {
        display: flex;
        flex-direction: column;
        padding-top: 50px;
        padding-bottom: 81px;
        height: 100%;
        border-right: 1px solid $border-color;
        background-color: $dark-blue;

        .navigation-section {
            margin: 15px;
            &:last-child {
                margin: auto 0 0;
                border-top: 1px solid $border-color;

                li {
                    padding: 15px;
                }
            }

            li {
                display: flex;

                h4 {
                    padding: 5px 10px;
                    color: rgba($white, 0.7);
                    text-transform: uppercase;
                    font-weight: 300;
                    font-size: 0.9em;
                }

                a {
                    @include item-hover;
                    display: flex;
                    align-items: center;
                    overflow: hidden;
                    padding: 10px;
                    width: 100%;
                    border-radius: 5px;
                    font-size: 0.85em;
                    transition: background-color 0.1s;

                    i {
                        margin-right: 7px;
                        font-size: 1.3em;
                    }

                    span {
                        overflow: hidden;
                        text-overflow: ellipsis;
                        white-space: nowrap;
                    }

                    &.active {
                        background-color: $accent-color;
                        color: $white;
                    }
                }
            }
        }
    }
}
</style>
