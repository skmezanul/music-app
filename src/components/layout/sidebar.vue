<template lang='pug'>
nav.sidebar-container
	ul
		// browse
		.sidebar-section
			li
				router-link(:to='{ name: "browse" }')
					i.material-icons book
					| {{ $t('browse') }}

		// my library
		.sidebar-section
			li
				h4 {{ $t('library') }}
			li
				router-link(:to='{ name: "mylibraryHistory" }')
					i.material-icons history
					| {{ $t('recentlyplayed') }}
			li
				router-link(:to='{ name: "mylibraryTracks" }')
					i.material-icons music_note
					| {{ $tc('track', 0) }}
			li
				router-link(:to='{ name: "mylibraryAlbums" }')
					i.material-icons album
					| {{ $tc('album', 0) }}

		// playlists
		transition(name='fade')
			.sidebar-section.playlists(v-if='playlists.length > 0')
				li
					h4 {{ $tc('playlist', 0) }}
				li(
					v-for='playlist in playlists',
					:key='playlist.id')
					router-link(:to='{ name: playlist.type, params: { id: playlist.id, owner: playlist.owner.id }}')
						i.material-icons playlist_play
						span {{ playlist.name }}

		// new playlist
		.sidebar-section.newplaylist
			li
				a
					i.material-icons playlist_add
					span {{ $t('newplaylist') }}

		transition(name='slide-up-margin')
			router-link.cover-container(
				tag='div',
				:to='{ name: "artist", params: { id: currentPlayback.item.artists[0].id }}',
				v-if='settings.largeCover')
				ma-button(type='overlay', @click.prevent.native='setAppSettings({ setting: "largeCover", value: false })', icon='close')
				img(
					:src='currentPlayback.item.album.images[0].url',
					:alt='currentPlayback.item.name')
</template>

<script>
import { mapGetters, mapMutations } from 'vuex';

export default {
  methods: {
    ...mapMutations({
      setAppSettings: 'SET_APP_SETTINGS',
    }),
  },
  computed: {
    ...mapGetters({
      currentPlayback: 'getCurrentPlayback',
      playlists: 'getPlaylists',
      settings: 'getAppSettings',
    }),
  },
};
</script>

<style lang="scss">
.sidebar-container {
  	grid-area: sidebar;
    border-right: 1px solid $border-color;
    background-color: $dark-grey;

    ul {
        @include flex($display: flex, $direction: column);
        padding: 50px 0 81px;
        height: 100vh;

        .sidebar-section {
            margin: 15px;

            &.playlists {
                overflow-y: auto;
                height: 100%;
            }

            &.newplaylist {
                margin: auto 0 0;
                border-top: 1px solid $border-color;

                li {
                    padding: 15px;
                }
            }

            li {
                @include flex($display: flex);

                h4 {
                    padding: 5px 10px;
										margin-bottom: 5px;
                }

                a {
                    @include item-hover;
                    @include flex($display: flex, $align: center);
                    @include font($size: 0.85em);
                    overflow: hidden;
                    padding: 10px;
                    width: 100%;
                    border-radius: 5px;

                    i {
                        @include font($size: 1.3em);
                        margin-right: 7px;
                    }

                    span {
                        overflow: hidden;
                        text-overflow: ellipsis;
                        white-space: nowrap;
                    }

                    &.active {
                        @include font($color: $white);
                        background-color: var(--accent-color);
                    }
                }
            }
        }
    }
    .cover-container {
        @include relative;
        height: 199px;
        border-top: 1px solid $border-color;
        .button {
            opacity: 0;
        }
        &:hover {
            .button {
                opacity: 1;
            }
        }
    }
}
</style>
