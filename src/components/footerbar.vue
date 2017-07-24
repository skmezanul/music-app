<template>
<footer class="footer">
  <div class="bottom left mobile-hidden">
    <img :src="playing.item.album.images[0].url" :alt="playing.item.name" />
    <div class="currently-playing">
      <span class="title">{{ playing.item.name }}</span>
      <div class="artist-container">
        <router-link v-for="artist in playing.item.artists" :key="artist.id" :to="'/artist/'+artist.id">{{ artist.name }}</router-link>
      </div>
    </div>
  </div>
  <div class="bottom center">
    <i @click="toggleShuffle" :class="{ 'active': playing.shuffle_state === true }" class="shuffle material-icons" v-tooltip="{ content: 'Shuffle', container: '.tooltip-container' }">shuffle</i>
    <i @click="previousTrack" class="skip material-icons">skip_previous</i>
    <i v-show="playing.is_playing === false" @click="resumePlayback" class="toggle play material-icons">play_circle_filled</i>
    <i v-show="playing.is_playing === true" @click="pausePlayback" class="toggle pause material-icons">pause_circle_filled</i>
    <i @click="nextTrack" class="skip material-icons">skip_next</i>
    <i v-show="playing.repeat_state != 'track'" @click="toggleRepeat" :class="{ 'active': playing.repeat_state === 'context' }" class="repeat material-icons" v-tooltip="{ content: 'Repeat', container: '.tooltip-container' }">repeat</i>
    <i v-show="playing.repeat_state === 'track'" @click="toggleRepeat" class="repeat material-icons active" v-tooltip="{ content: 'Repeat', container: '.tooltip-container' }">repeat_one</i>
  </div>
  <div class="bottom right mobile-hidden">
    <i v-if="volume == 0" class="volume material-icons">volume_mute</i>
    <i v-if="volume <= 50 && volume > 0" class="volume material-icons">volume_down</i>
    <i v-if="volume > 50" class="volume material-icons">volume_up</i>
    <slider ref="slider" v-model="volume" width="100px" tooltip="false"></slider>
    <i class="cast material-icons" v-tooltip="{ content: 'Cast', container: '.tooltip-container' }">cast</i>
    <i class="queue material-icons" v-tooltip="{ content: 'Queue', container: '.tooltip-container' }">queue_music</i>
  </div>
</footer>
</template>
<script>
import spotifyApi from '../api/'

export default {
  data() {
    return {
      volume: 50,
      playing: {}
    }
  },
  created() {
    // fetch the data when the view is created and the data is
    // already being observed
    this.fetchData()
  },
  watch: {
    // call again the method if value changes
    'playing': 'fetchData',
    'volume': 'setVolume'
  },
  methods: {
    fetchData() {
      spotifyApi.getMyCurrentPlaybackState()
        .then(response => this.playing = response)
    },
    previousTrack() {
      spotifyApi.skipToPrevious({
        device_id: this.$store.state.deviceID
      })
    },
    nextTrack() {
      spotifyApi.skipToNext({
        device_id: this.$store.state.deviceID
      })
    },
    pausePlayback() {
      spotifyApi.pause({
        device_id: this.$store.state.deviceID
      })
    },
    resumePlayback() {
      spotifyApi.play({
        device_id: this.$store.state.deviceID
      })
    },
    toggleRepeat() {
      spotifyApi.setRepeat({
        device_id: this.$store.state.deviceID
      })
    },
    toggleShuffle() {
      spotifyApi.setShuffle({
        device_id: this.$store.state.deviceID
      })
    },
    setVolume() {
      spotifyApi.setVolume({
        volume_percent: this.volume,
        device_id: this.$store.state.deviceID
      })
    }
  }
}
</script>

<style lang="scss">
.footer {
    display: flex;
    position: fixed;
    right: 0;
    bottom: 0;
    left: 0;
    align-items: center;
    padding: 15px 20px;
    background-color: $dark-blue;
    z-index: 999;
    border-top: 1px solid $border-color;

    .bottom {
        display: flex;
        align-items: center;
        height: 50px;

        &.left {
            flex: 1;
            justify-content: flex-start;

            img {
                height: 50px;
                width: 50px;
                margin-right: 10px;
                border-radius: 3px;
                box-shadow: $shadow;
            }

            .currently-playing {
                .title {
                    font-size: 1.2em;
                }

                .artist-container {
                    font-size: 0.9em;
                    font-weight: 300;

                    a {
                        color: rgba($white, 0.7);
                        transition: color 0.3s;
                        &:hover {
                            color: $white;
                            cursor: pointer;
                        }
                        &:after {
                            content: ", ";
                        }
                        &:last-child:after {
                            content: "";
                        }
                    }
                }
            }
        }

        &.right {
            flex: 1;
            justify-content: flex-end;

            i {
                padding-left: 20px;
            }
        }

        &.center {
            flex: 0.7;
            @media screen and (max-width: 955px) {
                flex: 1;
            }
            justify-content: space-between;

            .toggle {
                font-size: 3.3em;
                color: $white;
                &:hover {
                    transform: scale(1.15);
                }
            }
        }

        i {
            @include item-hover;
            &.active {
                color: $accent-color;
                opacity: 1;
            }
        }
    }
}
</style>
