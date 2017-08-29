<template lang="pug">
footer
	// current playback
	.footer-container.left.mobile-hidden
		img(
      :src='$store.state.currentPlayback.item.album.images[0].url',
      :alt='$store.state.currentPlayback.item.name')

		.currently-playing
			span.title {{ $store.state.currentPlayback.item.name }}
			.artist-container
				router-link.artist(
          v-for='artist in $store.state.currentPlayback.item.artists',
          :key='artist.id',
          :to='toArtist(artist.id)') {{ artist.name }}

	// playback controls
	.footer-container.center
		i.shuffle.material-icons(
      @click='toggleShuffle',
      :class='{ "active": $store.state.currentPlayback.shuffle_state == true }',
      v-tooltip='{ content: $t("shuffle"), container: ".tooltip-container" }') shuffle

		i.skip.material-icons(@click='previousTrack') skip_previous

		i.toggle.play.material-icons(
      v-show='!isPlaying',
      @click='resumePlayback') play_circle_filled

		i.toggle.pause.material-icons(
      v-show='isPlaying',
      @click='pausePlayback') pause_circle_filled

		i.skip.material-icons(@click='nextTrack') skip_next

		i.repeat.material-icons(
      v-show='$store.state.currentPlayback.repeat_state != "track"',
      @click='toggleRepeat',
      :class='{ "active": $store.state.currentPlayback.repeat_state == "context" }',
      v-tooltip='{ content: $t("repeat"), container: ".tooltip-container" }') repeat

		i.repeat.material-icons.active(
      v-show='$store.state.currentPlayback.repeat_state == "track"',
      @click='toggleRepeat',
      v-tooltip='{ content: $t("repeat"), container: ".tooltip-container" }') repeat_one

	// volume and other controls
	.footer-container.right.mobile-hidden
		i.volume.material-icons(v-if='volume == 0') volume_mute
		i.volume.material-icons(v-if='volume <= 50 && volume > 0') volume_down
		i.volume.material-icons(v-if='volume > 50') volume_up
		ma-slider(
      ref='slider',
      v-model='volume',
      width='100px',
      :bgStyle='bgStyle',
      :sliderStyle='sliderStyle',
      :processStyle='sliderStyle',
      :tooltip='false')
</template>

<script>
import {
  mapActions
} from 'vuex';

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
    setInterval(() => {
      this.GET_CURRENT_PLAYBACK();
    }, 3000);
  },
  watch: {
    // call again if value changes
    volume: 'setVolume',
  },
  methods: {
    ...mapActions(['GET_CURRENT_PLAYBACK']),

    // to artist
    toArtist(id) {
      const target = {
        name: 'artistOverview',
        params: {
          id,
        },
      };
      return target;
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
        this.GET_CURRENT_PLAYBACK();
      }).catch(() => {
        this.$store.commit('ADD_NOTICE', this.$t('errors.skipprev'));
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
        this.GET_CURRENT_PLAYBACK();
      }).catch(() => {
        this.$store.commit('ADD_NOTICE', this.$t('errors.skipnext'));
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
      }).then(() => {
        this.GET_CURRENT_PLAYBACK();
      }).catch(() => {
        this.$store.commit('ADD_NOTICE', this.$t('errors.pauseplayback'));
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
      }).then(() => {
        this.GET_CURRENT_PLAYBACK();
      }).catch(() => {
        this.$store.commit('ADD_NOTICE', this.$t('errors.resumeplayback'));
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
      }).catch(() => {
        this.$store.commit('ADD_NOTICE', this.$t('errors.togglerepeat'));
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
      }).catch(() => {
        this.$store.commit('ADD_NOTICE', this.$t('errors.toggleshuffle'));
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
      }).catch(() => {
        this.$store.commit('ADD_NOTICE', this.$t('errors.changevolume'));
      });
    },

    isPlaying() {
      if (this.$store.state.currentPlayback.is_playing) {
        return true;
      }
      return false;
    },
  },
  computed: {
    // check if playback is active
    isPlaying() {
      if (this.$store.state.currentPlayback.is_playing) {
        return true;
      }
      return false;
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

    .footer-container {
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
                    margin-top: 2px;

                    a {
                        @include comma-separated(0.9em, 300);
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
