<template>
<footer>
  <div class="footer left mobile-hidden">
    <img :src="$store.state.currentPlayback.item.album.images[0].url" :alt="$store.state.currentPlayback.item.name" />
    <div class="currently-playing">
      <span class="title">{{ $store.state.currentPlayback.item.name }}</span>
      <div class="artist-container">
        <a class="artist" v-for="artist in $store.state.currentPlayback.item.artists" :key="artist.id" @click="toArtist(artist.type, artist.id)">{{ artist.name }}</a>
      </div>
    </div>
  </div>
  <div class="footer center">
    <i @click="toggleShuffle" :class="{ 'active': $store.state.currentPlayback.shuffle_state === true }" class="shuffle material-icons" v-tooltip="{ content: 'Shuffle', container: '.tooltip-container' }">shuffle</i>
    <i @click="previousTrack" class="skip material-icons">skip_previous</i>
    <i v-show="$store.state.currentPlayback.is_playing === false" @click="resumePlayback" class="toggle play material-icons">play_circle_filled</i>
    <i v-show="$store.state.currentPlayback.is_playing === true" @click="pausePlayback" class="toggle pause material-icons">pause_circle_filled</i>
    <i @click="nextTrack" class="skip material-icons">skip_next</i>
    <i v-show="$store.state.currentPlayback.repeat_state != 'track'" @click="toggleRepeat" :class="{ 'active': $store.state.currentPlayback.repeat_state === 'context' }" class="repeat material-icons" v-tooltip="{ content: 'Repeat', container: '.tooltip-container' }">repeat</i>
    <i v-show="$store.state.currentPlayback.repeat_state === 'track'" @click="toggleRepeat" class="repeat material-icons active" v-tooltip="{ content: 'Repeat', container: '.tooltip-container' }">repeat_one</i>
  </div>
  <div class="footer right mobile-hidden">
    <i v-if="volume == 0" class="volume material-icons">volume_mute</i>
    <i v-if="volume <= 50 && volume > 0" class="volume material-icons">volume_down</i>
    <i v-if="volume > 50" class="volume material-icons">volume_up</i>
    <ma-slider ref="slider" v-model="volume" width="100px" :bgStyle="bgStyle" :sliderStyle="sliderStyle" :processStyle="sliderStyle" tooltip="false"></ma-slider>
    <i class="cast material-icons" v-tooltip="{ content: 'Cast', container: '.tooltip-container' }">cast</i>
    <i class="queue material-icons" v-tooltip="{ content: 'Queue', container: '.tooltip-container' }">queue_music</i>
  </div>
</footer>
</template>
<script>
export default {
  data() {
    return {
      volume: 50,
      bgStyle: {
        backgroundColor: '#1A1D2C',
      },
      sliderStyle: {
        backgroundColor: '#ca2a59',
      },
    };
  },
  watch: {
    // call again the method if value changes
    volume: 'setVolume',
  },
  methods: {
    toArtist(type, artistID) {
      this.$router.push({
        path: `/${type}/${artistID}`,
      });
    },
    previousTrack() {
      this.axios({
        method: 'post',
        url: '/me/player/previous',
        params: {
          device_id: this.$store.state.deviceID,
        },
      }).catch((err) => {
        this.$store.commit('ADD_NOTICE', `Could not skip to previous track, please try again later. ${err}`);
      });
    },
    nextTrack() {
      this.axios({
        method: 'post',
        url: '/me/player/next',
        params: {
          device_id: this.$store.state.deviceID,
        },
      }).catch((err) => {
        this.$store.commit('ADD_NOTICE', `Could not skip to next track, please try again later. ${err}`);
      });
    },
    pausePlayback() {
      this.axios({
        method: 'put',
        url: '/me/player/pause',
        params: {
          device_id: this.$store.state.deviceID,
        },
      }).catch((err) => {
        this.$store.commit('ADD_NOTICE', `Could not pause playback, please try again later. ${err}`);
      });
    },
    resumePlayback() {
      this.axios({
        method: 'put',
        url: '/me/player/play',
        params: {
          device_id: this.$store.state.deviceID,
        },
      }).catch((err) => {
        this.$store.commit('ADD_NOTICE', `Could not resume playback, please try again later. ${err}`);
      });
    },
    toggleRepeat() {
      this.axios({
        method: 'put',
        url: '/me/player/repeat',
        params: {
          state: 'context',
          device_id: this.$store.state.deviceID,
        },
      }).catch((err) => {
        this.$store.commit('ADD_NOTICE', `Could not toggle repeat, please try again later. ${err}`);
      });
    },
    toggleShuffle() {
      this.axios({
        method: 'put',
        url: '/me/player/shuffle',
        params: {
          state: !this.playing.shuffle_state,
          device_id: this.$store.state.deviceID,
        },
      }).catch((err) => {
        this.$store.commit('ADD_NOTICE', `Could not toggle shuffle, please try again later. ${err}`);
      });
    },
    setVolume() {
      this.axios({
        method: 'put',
        url: '/me/player/volume',
        params: {
          volume_percent: this.volume,
          device_id: this.$store.state.deviceID,
        },
      }).catch((err) => {
        this.$store.commit('ADD_NOTICE', `Volume could not be changed, please try again later. ${err}`);
      });
    },
  },
};
</script>

<style lang="scss">
footer {
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

    .footer {
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
                transition: transform 0.3s;
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
