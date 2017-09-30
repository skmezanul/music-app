<template lang="pug">
footer
	// current playback
	.footer-container.left
		.cover-container.mobile-hidden
			img(
				:src='$store.state.currentPlayback.item.album.images[0].url',
				:alt='$store.state.currentPlayback.item.name')

		.currently-playing
			router-link.title(:to='$toTarget("album", $store.state.currentPlayback.item.album.id)') {{ $store.state.currentPlayback.item.name }}
			.artist-container
				router-link.artist(
					v-for='artist in $store.state.currentPlayback.item.artists',
					:key='artist.id',
					:to='$toTarget(artist.type, artist.id)') {{ artist.name }}

	// playback controls
	.footer-container.center

		i.shuffle.material-icons(
			@click='toggleShuffle',
			:class='{ "active": $store.state.currentPlayback.shuffle_state}',
			v-tooltip='{ content: $t("shuffle") }') shuffle

		i.skip.material-icons(@click='skip("previous")') skip_previous

		i.toggle.play.material-icons(
			v-show='!$store.state.currentPlayback.is_playing',
			@click='togglePlayback("play")') play_circle_filled

		i.toggle.pause.material-icons(
			v-show='$store.state.currentPlayback.is_playing',
			@click='togglePlayback("pause")') pause_circle_filled

		i.skip.material-icons(@click='skip("next")') skip_next

		i.repeat.material-icons(
			v-show='$store.state.currentPlayback.repeat_state != "track"',
			@click='toggleRepeat',
			:class='{ "active": $store.state.currentPlayback.repeat_state == "context" }',
			v-tooltip='{ content: $t("repeat") }') repeat

		i.repeat.material-icons.active(
			v-show='$store.state.currentPlayback.repeat_state == "track"',
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
			span.track-progress {{ getDuration($store.state.currentPlayback.progress_ms) }}
			span.track-duration {{ getDuration($store.state.currentPlayback.item.duration_ms) }}

	// progress bar
	.progress-container
		.progress-bar(:style='getProgress()')
</template>

<script>
import {
  mapActions
} from 'vuex';

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
      const duration = that.$store.state.currentPlayback.item.duration_ms;
      const progress = that.$store.state.currentPlayback.progress_ms;
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
      const device_id = that.$store.state.deviceID;

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
      const device_id = that.$store.state.deviceID;

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
      const device_id = that.$store.state.deviceID;

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
      const state = !that.$store.state.currentPlayback.shuffle_state;
      const device_id = that.$store.state.deviceID;

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
      const device_id = that.$store.state.deviceID;

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

            .cover-container {
                margin-right: 10px;
                width: 50px;
                height: 50px;
                border-radius: 3px;
                box-shadow: $shadow;
                overflow: hidden;
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
                    font-weight: 300;
                    margin-top: 2px;

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
                width: 100%;
                margin-top: 10px;
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
                margin-left: 20px;
                padding: 5px 10px;
                border-radius: 5px;
                background-color: $blue;
                width: 110px;
                display: flex;
                justify-content: center;
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
