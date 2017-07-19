<template>
<nav class="sidenav">
  <ul>
    <div class="sidenav-section top">
      <li>
        <router-link to="/artist/0X2BH1fck6amBIoJhDVmmJ"><i class="material-icons">book</i>Browse</router-link>
      </li>
      <li>
        <router-link to="/radio"><i class="material-icons">radio</i>Radio</router-link>
      </li>
    </div>
    <div class="sidenav-section yourmusic">
      <li>
        <h4>Your Music</h4></li>
      <li>
        <router-link to="/lastheard"><i class="material-icons">history</i>Last heard</router-link>
      </li>
      <li>
        <router-link to="/songs"><i class="material-icons">music_note</i>Songs</router-link>
      </li>
      <li>
        <router-link to="/albums"><i class="material-icons">album</i>Albums</router-link>
      </li>
      <li>
        <router-link to="/artists"><i class="material-icons">person</i>Artists</router-link>
      </li>
    </div>
    <div class="sidenav-section playlists">
      <li>
        <h4>Playlists</h4>
      </li>
      <li v-for="playlist in playlists">
        <router-link :to="'/'+playlist.type+'/'+playlist.owner.id+'/'+playlist.id">
          <i class="material-icons">playlist_play</i>
          <span>{{ playlist.name }}</span>
        </router-link>
      </li>
    </div>
    <div class="sidenav-section bottom">
      <li><a><i class="material-icons">playlist_add</i>New Playlist</a></li>
    </div>
  </ul>
</nav>
</template>

<script>
import spotifyApi from '../api/'

export default {
  data() {
    return {
      playlists: {}
    }
  },
  created() {
    // fetch the data when the view is created and the data is
    // already being observed
    this.fetchData()
  },
  methods: {
    fetchData() {
      spotifyApi.getUserPlaylists()
        .then(response => this.playlists = response.items)
    }
  }
}
</script>

<style lang="scss">
nav {
    &.sidenav {
        position: fixed;
        left: 0;
        top: 0;
        bottom: 0;
        z-index: 999;
        width: 200px;
        margin-bottom: 81px;

        ul {
            display: flex;
            flex-direction: column;
            padding-top: 50px;
            background-color: $dark-blue;
            border-right: 1px solid $border-color;
            height: 100%;
            box-sizing: border-box;

            .sidenav-section {
                margin: 15px;

                &.bottom {
                    border-top: 1px solid $border-color;
                    margin: auto 0 0;

                    li {
                        padding: 15px;
                    }
                }

                li {
                    display: flex;
                    align-items: center;
                    transition: background-color 0.5s;
                    white-space: nowrap;
                    overflow: hidden;

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
                        @include item-hover;

                        i {
                            font-size: 1.3em;
                            margin-right: 7px;
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
}
</style>
