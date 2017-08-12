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
		this.$store.commit('ADD_NOTICE', `Playlists could not be fetched, please try again later. ${err}`);
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
	top: 0;
	bottom: 0;
	z-index: 999;
	width: 200px;

	ul {
		display: flex;
		flex-direction: column;
		padding-top: 50px;
		padding-bottom: 81px;
		background-color: $dark-blue;
		border-right: 1px solid $border-color;
		height: 100%;
		box-sizing: border-box;

		.navigation-section {
			margin: 15px;
			&:last-child {
				border-top: 1px solid $border-color;
				margin: auto 0 0;

				li {
					padding: 15px;
				}
			}

			li {
				display: flex;

				h4 {
					text-transform: uppercase;
					color: rgba($white, 0.7);
					font-weight: 300;
					font-size: 0.9em;
					padding: 5px 10px;
				}

				a {
					font-size: 0.85em;
					transition: background-color 0.1s;
					padding: 10px;
					border-radius: 5px;
					width: 100%;
					display: flex;
					align-items: center;
					overflow: hidden;
					@include item-hover;

					i {
						font-size: 1.3em;
						margin-right: 7px;
					}

					span {
						text-overflow: ellipsis;
						overflow: hidden;
						white-space: nowrap;
					}

					&.router-link-active {
						background-color: $accent-color;
						color: $white;
					}
				}
			}
		}
	}
}
</style>
