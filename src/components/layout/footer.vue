<template lang="pug">
footer
  // current playback
  .footer-container.left(:class='{ "cover-hidden" : settings.largeCover && !$mq.phone }')
    router-link.cover-container(
      v-if='$mq.desktop',
      tag='div',
      :to='$toRoute("artist", { id: currentPlayback.item.artists[0].id })')
      ma-button(type='overlay', @click.prevent.native='setAppSettings({ setting: "largeCover", value: true })', icon='keyboard_arrow_up')
      img(
        :src='currentPlayback.item.album.images[0].url',
        :alt='currentPlayback.item.name')

    .currently-playing
      router-link.title(:to='$toRoute("album", { id: currentPlayback.item.album.id })') {{ currentPlayback.item.name }}
      .artist-container
        router-link.artist(
          v-for='artist in currentPlayback.item.artists',
          :key='artist.id',
          :to='$toRoute("artist", { id: artist.id })') {{ artist.name }}

  // playback controls
  .footer-container.middle

    i.shuffle.material-icons(
      @click='SET_SHUFFLE',
      :class='{ "active": currentPlayback.shuffle_state}',
      v-tooltip='{ content: $t("shuffle") }') shuffle

    i.skip.material-icons(@click='SKIP("previous")') skip_previous

    i.toggle.play.material-icons(
      v-show='!currentPlayback.is_playing',
      @click='SET_PLAYBACK({state: "play"})') play_circle_filled

    i.toggle.pause.material-icons(
      v-show='currentPlayback.is_playing',
      @click='SET_PLAYBACK({state: "pause"})') pause_circle_filled

    i.skip.material-icons(@click='SKIP("next")') skip_next

    i.repeat.material-icons(
      v-show='currentPlayback.repeat_state != "track"',
      @click='TOGGLE_REPEAT',
      :class='{ "active": currentPlayback.repeat_state == "context" }',
      v-tooltip='{ content: $t("repeat") }') repeat

    i.repeat.material-icons.active(
      v-show='currentPlayback.repeat_state == "track"',
      @click='TOGGLE_REPEAT',
      v-tooltip='{ content: $t("repeat") }') repeat_one

  // volume and other controls
  .footer-container.right(v-if='$mq.desktop')
    i.volume.material-icons(v-if='volume == 0') volume_mute
    i.volume.material-icons(v-if='volume <= 50 && volume > 0') volume_down
    i.volume.material-icons(v-if='volume > 50') volume_up
    ma-slider(
      ref='slider',
      v-model='volume',
      width='100px',
      :tooltip='false')
    i.material-icons(
      @click='$modal.show("video")',
      v-tooltip='{ content: $t("watchvideo") }') music_video
    .time-container
      span.track-progress {{ $formatValue(currentPlayback.progress_ms, 'time') }}
      span.track-duration {{ $formatValue(currentPlayback.item.duration_ms, 'time') }}

  // progress bar
  .progress-container
    .progress-bar(:style='getProgress()')
</template>

<script>
import { mapActions, mapGetters, mapMutations } from 'vuex';

export default {
  methods: {
    ...mapActions([
      'GET_CURRENT_PLAYBACK',
      'SKIP',
      'SET_PLAYBACK',
      'TOGGLE_REPEAT',
      'SET_SHUFFLE'
    ]),

    ...mapMutations({
      setAppSettings: 'SET_APP_SETTINGS',
    }),

    // get progress of the current track in percent
    getProgress() {
      const that = this,
        duration = that.currentPlayback.item.duration_ms,
        progress = that.currentPlayback.progress_ms,
        value = ((duration - progress) / duration) * 100,
        valueRounded = Math.round(value * 100) / 100;

      return `width: ${valueRounded}%;`;
    },

    // set volume for the current playback
    setVolume(value) {
      const that = this,
        volume_percent = value,
        device_id = that.deviceId;

      that.$spotifyApi({
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

<style lang="scss">
footer {
    @include fixed($right: 0, $bottom: 0, $left: 0, $z-index: 998);
    @include flex($display: flex, $align: center, $wrap: wrap);
    padding: 15px 20px;
    border-top: 1px solid $border-color;
    background: $dark-blue;
    transform: translateZ(0);

    .footer-container {
        @include flex($display: flex, $align: center);
        height: 50px;

        &.left {
            @include flex($justify: flex-start, $align: center, $flex: 1);
            transition: transform 0.3s;
            will-change: transform;
            @media (max-width: $breakpoint-mobile) {
                 @include flex($basis: 100%);
            }
            @media (min-width: $breakpoint-mobile) {
                &.cover-hidden {
                    transform: translateX(-60px);
                    .cover-container {
                        opacity: 0;
                    }
                }
            }

            .cover-container {
                @include relative;
                overflow: hidden;
                margin-right: 10px;
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
                img {
                    width: 100%;
                    height: auto;
                }
            }

            .currently-playing {
                @media (min-width: $breakpoint-mobile) {
                    overflow: hidden;
                    max-width: 450px;
                    text-overflow: ellipsis;
                    white-space: nowrap;
                }
                @media (max-width: $breakpoint-mobile) {
                    width: 100%;
                    text-align: center;
                }
                .title {
                    @include font($size: 1.2em);
                }
                .artist-container {
                    margin-top: 2px;
                    @include font($weight: 300);

                    a {
                        @include comma-separated($size: 0.9em, $weight: 300);
                    }
                }
            }
        }

        &.middle {
            @include flex($justify: space-between, $flex: 0.7);
            @include font($spacing: 2px);
            @media (max-width: $breakpoint-mobile) {
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
            @include item-hover;
            &.active {
                @include font($color: var(--accent-color));
                opacity: 1;
            }
        }
    }
    .progress-container {
        @include absolute($right: 0, $bottom: 0, $left: 0);
        height: 4px;
        background-color: var(--accent-color);
        .progress-bar {
            @include absolute($right: 0);
            width: 100%;
            height: 100%;
            background: $dark-blue;
            transition: width 1s linear;
        }
    }
}
</style>
