<template lang='pug'>
footer.footer-container
  // current playback
  .footer-inner.left(:class='{ "cover-hidden" : settings.largeCover && !$mq.phone }')
    router-link.cover-container(
      v-if='$mq.desktop',
      tag='div',
      :to='{ name: "artist", params: { id: currentPlayback.item.artists[0].id }}')
      ma-button(
        type='overlay',
        @click.prevent.native='setAppSettings({ largeCover: true })',
        icon='keyboard_arrow_up')
      img.cover-image(
        v-lazy='currentPlayback.item.album.images[0].url',
        :alt='currentPlayback.item.name')

    .currently-playing
      router-link.title(:to='{ name: "album", params: { id: currentPlayback.item.album.id }}') {{ currentPlayback.item.name }}
      .artist-container
        router-link.artist(
          v-for='artist in currentPlayback.item.artists',
          :key='artist.id',
          :to='{ name: "artist", params: { id: artist.id }}') {{ artist.name }}

    transition(name='fade')
      .background-container(v-show='!settings.largeCover && !$mq.phone')
        img.cover-image(
          v-lazy='currentPlayback.item.album.images[0].url',
          :alt='currentPlayback.item.name')

  // playback controls
  .footer-inner.middle

    ma-icon.shuffle(
      :hover='true',
      @click.native='setShuffle',
      :class='{ "active": currentPlayback.shuffle_state }',
      v-tooltip='{ content: $t("shuffle") }') shuffle

    ma-icon.skip(:hover='true', @click.native='skipTo({ direction: "previous" })') skip_previous

    ma-icon.toggle(
      :class='isPlaying ? "pause" : "play"',
      @click.native='togglePlayback') {{ isPlaying ? 'pause_circle_filled' : 'play_circle_filled' }}

    ma-icon.skip(:hover='true', @click.native='skipTo({ direction: "next" })') skip_next

    ma-icon.repeat(
      :hover='true',
      v-if='currentPlayback.repeat_state != "track"',
      @click.native='toggleRepeat',
      :class='{ "active": currentPlayback.repeat_state == "context" }',
      v-tooltip='{ content: $t("repeat") }') repeat

    ma-icon.repeat.active(
      :hover='true',
      v-if='currentPlayback.repeat_state == "track"',
      @click.native='toggleRepeat',
      v-tooltip='{ content: $t("repeat") }') repeat_one

  // other controls
  .footer-inner.right(v-if='$mq.desktop')
    ma-icon(
      :hover='true',
      @click.native='$modal.show("video")',
      v-tooltip='{ content: $t("watchvideo") }') music_video
    .time-container
      span.track-progress {{ trackProgress }}
      span.track-duration {{ trackDuration }}

  // progress bar
  .progress-container(@click='jumpToProgress', ref='progressContainer')
    progress.progress-bar(ref='progressBar', :max='duration')
</template>

<script>
import {
  mapActions,
  mapGetters,
  mapMutations,
} from 'vuex';

import { TweenLite, Linear } from 'gsap';

export default {

  data: () => ({
    currentProgress: 0,
    progressInterval: null,
  }),

  created() {
    this.updateProgress();
  },

  watch: {
    // watch the progress and update it when it changes
    progress() {
      this.updateProgress();
    },

    // watch the playback state and start / stop the interval accordingly
    isPlaying() {
      this.updateProgress();
    },

    // reset timeout when playback is at the end of the track
    currentProgress(value) {
      const self = this,
        { progressBar } = self.$refs;

      TweenLite.to(progressBar, 1, {
        attr: {
          value,
        },
        ease: Linear.easeNone,
      });

      if (value >= self.duration) {
        clearInterval(self.progressInterval);
      }
    },
  },

  methods: {
    ...mapActions({
      skipTo: 'playback/SKIP_TO',
      seekTo: 'playback/SEEK_TO',
      toggleRepeat: 'playback/TOGGLE_REPEAT',
      setShuffle: 'playback/SET_SHUFFLE',
      togglePlayback: 'player/TOGGLE_PLAYBACK',
    }),

    ...mapMutations('app', {
      setAppSettings: 'SET_APP_SETTINGS',
    }),

    // add one second to the progress every second
    updateProgress() {
      const self = this,
        // half a second in milliseconds
        oneSecond = 1000;

      // clear the interval before starting a new one
      clearInterval(self.progressInterval);

      // set local progress to current progress from the api
      self.currentProgress = self.progress;

      if (self.isPlaying) {
        // count up 500 milliseconds every 500 milliseconds
        self.progressInterval = setInterval(() => {
          self.currentProgress += oneSecond;
        }, oneSecond);
      }
    },

    // jump to progress
    jumpToProgress(event) {
      const self = this,
        { currentPlayback } = self,
        { progressContainer } = self.$refs,
        progressBarWidth = progressContainer.offsetWidth,
        clickedPosition = (event.clientX / progressBarWidth) * 100,
        position = Math.round((self.duration / 100) * clickedPosition);

      if (progressContainer && position) {
        self.seekTo({
          position,
        }).then(() => {
          self.currentProgress = position;
        });
      }
    },
  },

  computed: {
    ...mapGetters({
      currentPlayback: 'playback/getCurrentPlayback',
      settings: 'app/getAppSettings',
      duration: 'playback/getDuration',
      progress: 'playback/getProgress',
      isPlaying: 'playback/getPlayingState',
    }),

    // get human readable track progress
    trackProgress() {
      const self = this,
        minutes = Math.floor(self.currentProgress / 60000),
        seconds = ((self.currentProgress % 60000) / 1000).toFixed(0);

      return self.currentProgress >= 0 ? `${minutes}:${seconds < 10 ? '0' : ''}${seconds}` : 0;
    },

    // get human readable track duration
    trackDuration() {
      const self = this,
        minutes = Math.floor(self.duration / 60000),
        seconds = ((self.duration % 60000) / 1000).toFixed(0);

      return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
    },
  },

};
</script>

<style lang='scss'>
.footer-container {
    @include fixed($right: 0, $bottom: 0, $left: 0, $index: 999);
    @include flex($display: flex, $align: center, $wrap: wrap);
    overflow: hidden;
    padding: 15px 20px;
    border-top: 1px solid $border-color;
    transform: translateZ(0);
    background: $dark-blue;

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
                    background: ease-in-out-sine-gradient(to left, $dark-blue, rgba($dark-blue, 0.5)), radial-gradient(circle, rgba($dark-blue, 0.3), $dark-blue);
                    content: "";
                }
            }

            .cover-container {
                @include relative;
                overflow: hidden;
                margin-right: 15px;
                size: 50px;
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
                    margin-top: 2px;
                    a {
                        @include comma-separated($size: 0.9em);
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
                background-color: $blue;
                @include font($weight: 600);
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
            @include absolute();
            size: 100%;
            color: var(--accent-color);
            background-color: var(--accent-color);
            &::-moz-progress-bar {
              background-color: var(--accent-color);
            }
            &::-webkit-progress-value {
              background-color: var(--accent-color);
            }
        }
    }
}
</style>
