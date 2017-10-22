<template lang='pug'>
nav.navigation-container
  ul
    // browse
    .navigation-section
      li
        router-link(to='/browse')
          i.material-icons book
          | {{ $t('browse') }}

    // my library
    .navigation-section
      li
        h4 {{ $t('library') }}
      li
        router-link(to='/history')
          i.material-icons history
          | {{ $t('recentlyplayed') }}
      li
        router-link(to='/tracks')
          i.material-icons music_note
          | {{ $tc('track', 0) }}
      li
        router-link(to='/albums')
          i.material-icons album
          | {{ $tc('album', 0) }}
      li
        router-link(to='/artists')
          i.material-icons person
          | {{ $tc('artist', 0) }}

    // playlists
    transition(name='fade')
      .navigation-section.playlists(v-if='playlists.length > 0')
        li
          h4 {{ $tc('playlist', 0) }}
        li(v-for='playlist in playlists', :key='playlist.id')
          router-link(:to='$toTarget("playlist", playlist.id, playlist.owner.id)')
            i.material-icons playlist_play
            span {{ playlist.name }}

    // new playlist
    .navigation-section.newplaylist
      li
        a
          i.material-icons playlist_add
          span {{ $t('newplaylist') }}

    transition(name='slide-up-margin')
      router-link.cover-container(
        tag='div',
        :to='$toTarget("artist", currentPlayback.item.artists[0].id)',
        v-if='$store.state.largeCover')
        ma-button(type='overlay', @click.prevent.native='$store.commit("TOGGLE_LARGE_COVER")', icon='close')
        img(
          :src='currentPlayback.item.album.images[0].url',
          :alt='currentPlayback.item.name')
</template>

<script>
import { mapGetters } from 'vuex';

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
      const that = this;

      that.$spotifyApi({
        method: 'get',
        url: '/me/playlists',
        params: {
          limit: 10,
        },
      }).then((res) => {
        that.playlists = res.data.items;
      });
    },
  },
  computed: {
    ...mapGetters({
      currentPlayback: 'getCurrentPlayback',
    }),
  },
};
</script>

<style lang="scss">
.navigation-container {
    position: fixed;
    top: 0;
    bottom: 0;
    left: 0;
    z-index: 997;
    width: 200px;
    transform: translateZ(0);

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
    .cover-container {
      position: relative;
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
      img {
          width: 100%;
          height: auto;
      }
    }
}
</style>
