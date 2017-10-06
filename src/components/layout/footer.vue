<template lang="pug">
footer
  // current playback
  .footer-container.left(:class='{ "cover-hidden" : $store.state.largeCover }')
    transition(name='fade')
      router-link.cover-container.mobile-hidden(
        tag='div',
        :to='$toTarget("artist", currentPlayback.item.artists[0].id)')
        i.cover-toggle.material-icons(@click.prevent='$store.commit("TOGGLE_LARGE_COVER")') keyboard_arrow_up
        img(
          :src='currentPlayback.item.album.images[0].url',
          :alt='currentPlayback.item.name')

    .currently-playing
      router-link.title(:to='$toTarget("album", currentPlayback.item.album.id)') {{ currentPlayback.item.name }}
      .artist-container
        router-link.artist(
          v-for='artist in currentPlayback.item.artists',
          :key='artist.id',
          :to='$toTarget(artist.type, artist.id)') {{ artist.name }}

  // playback controls
  .footer-container.center

    i.shuffle.material-icons(
      @click='toggleShuffle',
      :class='{ "active": currentPlayback.shuffle_state}',
      v-tooltip='{ content: $t("shuffle") }') shuffle

    i.skip.material-icons(@click='skip("previous")') skip_previous

    i.toggle.play.material-icons(
      v-show='!currentPlayback.is_playing',
      @click='togglePlayback("play")') play_circle_filled

    i.toggle.pause.material-icons(
      v-show='currentPlayback.is_playing',
      @click='togglePlayback("pause")') pause_circle_filled

    i.skip.material-icons(@click='skip("next")') skip_next

    i.repeat.material-icons(
      v-show='currentPlayback.repeat_state != "track"',
      @click='toggleRepeat',
      :class='{ "active": currentPlayback.repeat_state == "context" }',
      v-tooltip='{ content: $t("repeat") }') repeat

    i.repeat.material-icons.active(
      v-show='currentPlayback.repeat_state == "track"',
      @click='toggleRepeat',
      v-tooltip='{ content: $t("repeat") }') repeat_one

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
    .time-container
      span.track-progress {{ getDuration(currentPlayback.progress_ms) }}
      span.track-duration {{ getDuration(currentPlayback.item.duration_ms) }}

  // progress bar
  .progress-container
    .progress-bar(:style='getProgress()')
</template>

<script>
import { mapActions, mapGetters } from 'vuex';

export default {
  data() {
    return {
      volume: 50,
      isPlaying: false,
      bgStyle: {
        backgroundColor: '#1A1D2C',
      },
      sliderStyle: {
        backgroundColor: '#ca2a59',
      },
    };
  },
  created() {
    // update current playback and progress every second
    setInterval(() => {
      this.GET_CURRENT_PLAYBACK();
      this.getProgress();
    }, 1000);
  },
  watch: {
    // call again if value changes
    volume: 'setVolume',
  },
  methods: {
    ...mapActions(['GET_CURRENT_PLAYBACK']),

    // get progress of the current track in percent
    getProgress() {
      const that = this;
      const duration = that.currentPlayback.item.duration_ms;
      const progress = that.currentPlayback.progress_ms;
      const value = ((duration - progress) / duration) * 100;
      const valueRounded = Math.round(value * 100) / 100;
      return `width: ${valueRounded}%;`;
    },

    // get formattted duration
    getDuration(duration) {
      const minutes = Math.floor(duration / 60000);
      const seconds = ((duration % 60000) / 1000).toFixed(0);
      return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
    },

    // skip to previous/next track
    skip(direction) {
      const that = this;
      const device_id = that.deviceId;

      that.axios({
        method: 'post',
        url: `/me/player/${direction}`,
        params: {
          device_id,
        },
      }).then(() => {
        that.GET_CURRENT_PLAYBACK();
      });
    },

    // resume/pause current playback
    togglePlayback(state) {
      const that = this;
      const device_id = that.deviceId;

      that.axios({
        method: 'put',
        url: `/me/player/${state}`,
        params: {
          device_id,
        },
      }).then(() => {
        that.GET_CURRENT_PLAYBACK();
      });
    },

    // toggle repeat for the current playback
    toggleRepeat() {
      const that = this;
      const device_id = that.deviceId;

      that.axios({
        method: 'put',
        url: '/me/player/repeat',
        params: {
          state: 'context',
          device_id,
        },
      });
    },

    // toggle shuffle for the current playback
    toggleShuffle() {
      const that = this;
      const state = !that.currentPlayback.shuffle_state;
      const device_id = that.deviceId;

      that.axios({
        method: 'put',
        url: '/me/player/shuffle',
        params: {
          state,
          device_id,
        },
      });
    },

    // set volume for the current playback
    setVolume() {
      const that = this;
      const volume_percent = that.volume;
      const device_id = that.deviceId;

      that.axios({
        method: 'put',
        url: '/me/player/volume',
        params: {
          volume_percent,
          device_id,
        },
      });
    },
  },
  computed: {
    ...mapGetters({
      currentPlayback: 'getCurrentPlayback',
      deviceId: 'getDeviceId',
    }),
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
    background: $dark-blue;
    transform: translateZ(0);
    @media (max-width: $breakpoint-mobile) {
        flex-direction: column;
    }

    .footer-container {
        display: flex;
        align-items: center;
        height: 50px;

        &.left {
            flex: 1;
            justify-content: flex-start;
            transition: transform 0.3s;
            will-change: transform;

            &.cover-hidden {
              transform: translateX(-60px);
              .cover-container {
                opacity: 0;
              }
            }

            .cover-container {
                position: relative;
                overflow: hidden;
                margin-right: 10px;
                width: 50px;
                height: 50px;
                border-radius: 3px;
                box-shadow: $shadow;
                transition: opacity 0.3s;
                &:hover {
                  .cover-toggle {
                    opacity: 1;
                  }
                }
                .cover-toggle {
                  @include item-hover;
                  position: absolute;
                  top: 2px;
                  right: 2px;
                  padding: 2px;
                  border-radius: 50%;
                  background-color: rgba($black, 0.5);
                  opacity: 0;
                }
                img {
                    width: 100%;
                    height: auto;
                }
            }

            .currently-playing {
                @media (max-width: $breakpoint-mobile) {
                    text-align: center;
                }
                .title {
                    font-size: 1.2em;
                }
                .artist-container {
                    margin-top: 2px;
                    font-weight: 300;

                    a {
                        @include comma-separated(0.9em, 300);
                    }
                }
            }
        }

        &.center {
            flex: 0.7;
            justify-content: space-between;
            letter-spacing: 2px;
            @media (max-width: $breakpoint-mobile) {
                flex: 1 !important;
                margin-top: 10px;
                width: 100%;
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

        &.right {
            flex: 1;
            justify-content: flex-end;
            .time-container {
                display: flex;
                justify-content: center;
                margin-left: 20px;
                padding: 5px 10px;
                width: 110px;
                border-radius: 5px;
                background-color: $blue;
                .track-progress {
                  margin-right: 5px;
                    &:after {
                        content: " /";
                    }
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
    .progress-container {
        position: absolute;
        right: 0;
        bottom: 0;
        left: 0;
        height: 4px;
        background-color: $accent-color;
        .progress-bar {
            position: absolute;
            right: 0;
            width: 100%;
            height: 100%;
            background: $dark-blue;
            transition: width 1s linear;
        }
    }
}
</style>
