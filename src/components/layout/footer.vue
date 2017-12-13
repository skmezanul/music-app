<template lang='pug'>
footer.footer-container
  // current playback
  .footer-inner.left(:class='{ "cover-hidden" : settings.largeCover && !$mq.phone }')
    router-link.cover-container(
      v-if='$mq.desktop',
      tag='div',
      :to='{ name: "artist", params: { id: currentPlayback.item.artists[0].id }}')
      ma-button(type='overlay', @click.prevent.native='setAppSettings({ setting: "largeCover", value: true })', icon='keyboard_arrow_up')
      img.cover-image(
        :src='currentPlayback.item.album.images[0].url',
        :alt='currentPlayback.item.name')

    .currently-playing
      router-link.title(:to='{ name: "album", params: { id: currentPlayback.item.album.id }}') {{ currentPlayback.item.name }}
      .artist-container
        router-link.artist(
          v-for='artist in currentPlayback.item.artists',
          :key='artist.id',
          :to='{ name: "artist", params: { id: artist.id }}') {{ artist.name }}

    transition(name='fade')
      .background-container(v-if='!settings.largeCover && !$mq.phone',)
        img.cover-image(
          :src='currentPlayback.item.album.images[0].url',
          :alt='currentPlayback.item.name')

  // playback controls
  .footer-inner.middle

    ma-icon.shuffle(
      :hover='true',
      @click.native='SET_SHUFFLE',
      :class='{ "active": currentPlayback.shuffle_state }',
      v-tooltip='{ content: $t("shuffle") }') shuffle

    ma-icon.skip(:hover='true', @click.native='SKIP_TO({ direction: "previous" })') skip_previous

    ma-icon.toggle(
      :class='currentPlayback.is_playing ? "pause" : "play"',
      @click.native='SET_PLAYBACK({ state: currentPlayback.is_playing ? "pause" : "play" })') {{ currentPlayback.is_playing ? 'pause_circle_filled' : 'play_circle_filled' }}

    ma-icon.skip(:hover='true', @click.native='SKIP_TO({ direction: "next" })') skip_next

    ma-icon.repeat(
      :hover='true',
      v-if='currentPlayback.repeat_state != "track"',
      @click.native='TOGGLE_REPEAT',
      :class='{ "active": currentPlayback.repeat_state == "context" }',
      v-tooltip='{ content: $t("repeat") }') repeat

    ma-icon.repeat.active(
      :hover='true',
      v-if='currentPlayback.repeat_state == "track"',
      @click.native='TOGGLE_REPEAT',
      v-tooltip='{ content: $t("repeat") }') repeat_one

  // volume and other controls
  .footer-inner.right(v-if='$mq.desktop')
    ma-icon.volume {{ volume > 50 ? 'volume_up' : 'volume_down' }}
    ma-slider(
      ref='slider',
      v-model='volume',
      width='100px',
      :tooltip='false')
    ma-icon(
      :hover='true',
      @click.native='$modal.show("video")',
      v-tooltip='{ content: $t("watchvideo") }') music_video
    .time-container
      span.track-progress {{ $formatValue(currentPlayback.progress_ms, 'time') }}
      span.track-duration {{ $formatValue(currentPlayback.item.duration_ms, 'time') }}

  // progress bar
  .progress-container(@click='getSeekTime', ref='progressContainer')
    .progress-bar
</template>

<script>
import {
  mapActions,
  mapGetters,
  mapMutations,
} from 'vuex';
import {
  TweenLite,
} from 'gsap';

export default {
  created() {
    this.getProgressBarWidth();
  },
  methods: {
    ...mapActions([
      'GET_PLAYBACK',
      'SKIP_TO',
      'SEEK_TO',
      'SET_PLAYBACK',
      'TOGGLE_REPEAT',
      'SET_SHUFFLE',
    ]),

    ...mapMutations({
      setAppSettings: 'SET_APP_SETTINGS',
    }),

    // get progress of the current track in percent
    getProgressBarWidth() {
      const self = this,
        { currentPlayback } = self,
        trackDuration = currentPlayback.item.duration_ms,
        trackProgress = currentPlayback.progress_ms,
        value = ((trackDuration - trackProgress) / trackDuration) * 100;

      TweenLite.to('.progress-bar', 1, {
        width: Math.round(value),
      });
    },

    // set volume for the current playback
    setVolume(value) {
      const self = this;

      self.$spotifyApi({
        method: 'put',
        url: '/me/player/volume',
        params: {
          volume_percent: value,
          device_id: self.deviceId,
        },
      });
    },

    getSeekTime(event) {
      const self = this,
        {
          progressContainer,
        } = self.$refs,
        progressBarWidth = progressContainer.offsetWidth,
        clickedPosition = (event.clientX / progressBarWidth) * 100,
        trackDuration = self.currentPlayback.item.duration_ms,
        position = Math.round((trackDuration / 100) * clickedPosition);

      if (progressContainer && position) {
        self.SEEK_TO({
          position,
        });
      }
    },
  },
  computed: {
    ...mapGetters({
      currentPlayback: 'getCurrentPlayback',
      deviceId: 'getDeviceId',
      settings: 'getAppSettings',
    }),

    volume: {
      get() {
        return this.currentPlayback.device.volume_percent;
      },
      set(value) {
        this.setVolume(value);
      },
    },
  },
};
</script>

<style lang='scss'>
.footer-container {
    @include absolute($right: 0, $bottom: 0, $left: 0, $index: 999);
    @include flex($display: flex, $align: center, $wrap: wrap);
    overflow: hidden;
    padding: 15px 20px;
    border-top: 1px solid $border-color;
    background: $dark-grey;

    .footer-inner {
        @include flex($display: flex, $align: center);
        height: 50px;

        &.left {
            @include flex($justify: flex-start, $align: center, $flex: 1);
            transition: transform 0.3s;
            will-change: transform;
            @media (max-width: $mobile-breakpoint) {
                 @include flex($basis: 100%);
            }
            @media (min-width: $mobile-breakpoint) {
                &.cover-hidden {
                    transform: translateX(-60px);
                    .cover-container {
                        opacity: 0;
                    }
                }
            }

            .background-container {
                @include absolute($top: -15px, $bottom: 0, $left: -20px, $index: -1);
                @include flex($display: flex, $justify: center, $align: center);
                overflow: hidden;
                max-width: 400px;
                height: 81px;
                .cover-image {
                    filter: saturate(150%) blur(3px);
                }
                &:before {
                    @include absolute($all: 0, $index: 1);
                    background: ease-in-out-sine-gradient(to left, $main-bg-color, rgba($main-bg-color, 0.5)), radial-gradient(circle, rgba($main-bg-color, 0.3), $main-bg-color);
                    content: "";
                }
            }

            .cover-container {
                @include relative;
                overflow: hidden;
                margin-right: 15px;
                width: 50px;
                height: 50px;
                border-radius: 3px;
                box-shadow: $shadow;
                transition: opacity 0.3s;
                .button {
                    opacity: 0;
                }
                &:hover {
                    .button {
                        opacity: 1;
                    }
                }
            }

            .currently-playing {
                @media (min-width: $mobile-breakpoint) {
                    overflow: hidden;
                    max-width: 450px;
                    text-overflow: ellipsis;
                    white-space: nowrap;
                }
                @media (max-width: $mobile-breakpoint) {
                    width: 100%;
                    text-align: center;
                }
                .title {
                    @include font($size: 1.2em, $weight: 600);
                }
                .artist-container {
                    @include font($weight: 200);
                    margin-top: 2px;

                    a {
                        @include comma-separated($size: 0.9em, $weight: 200);
                    }
                }
            }
        }

        &.middle {
            @include flex($justify: space-between, $flex: 0.5);
            @include font($spacing: 2px);
            @media (max-width: $mobile-breakpoint) {
                 @include flex($flex: 1);
                margin-top: 10px;
            }

            .toggle {
                @include font($size: 3.3em, $color: $white);
                transition: transform 0.3s;
                &:hover {
                    transform: scale(1.15);
                }
            }
        }

        &.right {
            @include flex($justify: flex-end, $flex: 1);
            i {
                margin-left: 10px;
            }
            .time-container {
                @include flex($display: flex, $justify: center);
                margin-left: 20px;
                padding: 5px 10px;
                width: 110px;
                border-radius: 5px;
                background-color: $grey;
                .track-progress {
                    margin-right: 5px;
                    &:after {
                        content: " /";
                    }
                }
            }
            // slider styling
            .vue-slider-component {
                .vue-slider {
                    background-color: rgba($white, 0.3);
                    .vue-slider-dot,
                    .vue-slider-process {
                        background-color: var(--accent-color);
                    }
                }
            }
        }

        i {
            &.volume {
                color: rgba($white, 0.7);
            }
            &.toggle {
                cursor: pointer;
            }
            &.active {
                @include font($color: var(--accent-color));
                opacity: 1;
            }
        }
    }
    .progress-container {
        @include absolute($right: 0, $bottom: 0, $left: 0);
        height: 4px;
        .progress-bar {
            @include absolute($left: 0);
            height: 100%;
            background-color: var(--accent-color);
        }
    }
}
</style>
