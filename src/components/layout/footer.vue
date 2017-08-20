<template lang="pug">
footer
	// current playback
	.footer.left.mobile-hidden
		img(:src='$store.state.currentPlayback.item.album.images[0].url', :alt='$store.state.currentPlayback.item.name')
		.currently-playing
			span.title {{ $store.state.currentPlayback.item.name }}
			.artist-container
				a.artist(v-for='artist in $store.state.currentPlayback.item.artists', :key='artist.id', @click='toArtist(artist.type, artist.id)') {{ artist.name }}

	// playback controls
	.footer.center
		i.shuffle.material-icons(@click='toggleShuffle', :class="{ 'active': $store.state.currentPlayback.shuffle_state == true }", v-tooltip="{ content: 'Shuffle', container: '.tooltip-container' }") shuffle
		i.skip.material-icons(@click='previousTrack') skip_previous
		i.toggle.play.material-icons(v-show='$store.state.currentPlayback.is_playing == false', @click='resumePlayback') play_circle_filled
		i.toggle.pause.material-icons(v-show='$store.state.currentPlayback.is_playing == true', @click='pausePlayback') pause_circle_filled
		i.skip.material-icons(@click='nextTrack') skip_next
		i.repeat.material-icons(v-show="$store.state.currentPlayback.repeat_state != 'track'", @click='toggleRepeat', :class="{ 'active': $store.state.currentPlayback.repeat_state == 'context' }", v-tooltip="{ content: 'Repeat', container: '.tooltip-container' }") repeat
		i.repeat.material-icons.active(v-show="$store.state.currentPlayback.repeat_state == 'track'", @click='toggleRepeat', v-tooltip="{ content: 'Repeat', container: '.tooltip-container' }") repeat_one

	// volume and other controls
	.footer.right.mobile-hidden
		i.volume.material-icons(v-if='volume == 0') volume_mute
		i.volume.material-icons(v-if='volume <= 50 && volume > 0') volume_down
		i.volume.material-icons(v-if='volume > 50') volume_up
		ma-slider(ref='slider', v-model='volume', width='100px', :bgStyle='bgStyle', :sliderStyle='sliderStyle', :processStyle='sliderStyle', tooltip='false')
		i.cast.material-icons(v-tooltip="{ content: 'Cast', container: '.tooltip-container' }") cast
		i.queue.material-icons(v-tooltip="{ content: 'Queue', container: '.tooltip-container' }") queue_music
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
  created() {
    // fetch the data when the view is created and the data is
    // already being observed
    this.getCurrentPlayback();
  },
  watch: {
    // call again if value changes
    volume: 'setVolume',
    $route: 'getCurrentPlayback',
  },
  methods: {
    toArtist(type, artistID) {
      this.$router.push({
        path: `/${type}/${artistID}`,
      });
    },

    // get the current playback
    getCurrentPlayback() {
      this.axios({
        method: 'get',
        url: '/me/player',
      }).then((res) => {
        this.$store.commit('CURRENT_PLAYBACK', res.data);
      }).catch((err) => {
        this.$store.commit('CURRENT_PLAYBACK', []);
        this.$store.commit(
          'ADD_NOTICE',
          `Could not fetch your current playback, please try again later. ${err}`
        );
      });
    },

    // go to previous track
    previousTrack() {
      this.axios({
        method: 'post',
        url: '/me/player/previous',
        params: {
          device_id: this.$store.state.deviceID,
        },
      }).then(() => {
        this.getCurrentPlayback();
      }).catch((err) => {
        this.$store.commit(
          'ADD_NOTICE',
          `Could not skip to previous track, please try again later. ${err}`
        );
      });
    },

    // go to next track
    nextTrack() {
      this.axios({
        method: 'post',
        url: '/me/player/next',
        params: {
          device_id: this.$store.state.deviceID,
        },
      }).then(() => {
        this.getCurrentPlayback();
      }).catch((err) => {
        this.$store.commit(
          'ADD_NOTICE',
          `Could not skip to next track, please try again later. ${err}`
        );
      });
    },

    // pause current playback
    pausePlayback() {
      this.axios({
        method: 'put',
        url: '/me/player/pause',
        params: {
          device_id: this.$store.state.deviceID,
        },
      }).catch((err) => {
        this.$store.commit(
          'ADD_NOTICE',
          `Could not pause playback, please try again later. ${err}`
        );
      });
    },

    // resume playback
    resumePlayback() {
      this.axios({
        method: 'put',
        url: '/me/player/play',
        params: {
          device_id: this.$store.state.deviceID,
        },
      }).catch((err) => {
        this.$store.commit(
          'ADD_NOTICE',
          `Could not resume playback, please try again later. ${err}`
        );
      });
    },

    // toggle repeat for the current playback
    toggleRepeat() {
      this.axios({
        method: 'put',
        url: '/me/player/repeat',
        params: {
          state: 'context',
          device_id: this.$store.state.deviceID,
        },
      }).catch((err) => {
        this.$store.commit(
          'ADD_NOTICE',
          `Could not toggle repeat, please try again later. ${err}`
        );
      });
    },

    // toggle shuffle for the current playback
    toggleShuffle() {
      this.axios({
        method: 'put',
        url: '/me/player/shuffle',
        params: {
          state: !this.playing.shuffle_state,
          device_id: this.$store.state.deviceID,
        },
      }).catch((err) => {
        this.$store.commit(
          'ADD_NOTICE',
          `Could not toggle shuffle, please try again later. ${err}`
        );
      });
    },

    // set volume for the current playback
    setVolume() {
      this.axios({
        method: 'put',
        url: '/me/player/volume',
        params: {
          volume_percent: this.volume,
          device_id: this.$store.state.deviceID,
        },
      }).catch((err) => {
        this.$store.commit(
          'ADD_NOTICE',
          `Volume could not be changed, please try again later. ${err}`
        );
      });
    },
  },
};
</script>

<style lang="scss">
footer {
    position: fixed;
    right: 0;
    bottom: 0;
    left: 0;
    z-index: 998;
    display: flex;
    align-items: center;
    padding: 15px 20px;
    border-top: 1px solid $border-color;
    background-color: $dark-blue;
    -webkit-font-smoothing: subpixel-antialiased;

    .footer {
        display: flex;
        align-items: center;
        height: 50px;

        &.left {
            flex: 1;
            justify-content: flex-start;

            img {
                margin-right: 10px;
                width: 50px;
                height: 50px;
                border-radius: 3px;
                box-shadow: $shadow;
            }

            .currently-playing {
                .title {
                    font-size: 1.2em;
                }

                .artist-container {
                    font-weight: 300;
                    font-size: 0.9em;

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
            justify-content: space-between;
            @media screen and (max-width: 955px) {
                flex: 1;
            }

            .toggle {
                color: $white;
                font-size: 3.3em;
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
