<template lang='pug'>
li.list-item(
	@dblclick='SET_PLAYBACK({ state: "play", trackId })',
	:class='{ "playing" : isPlaying, "has-image" : image }')

	// image
	.image-container(v-if='image')
		ma-icon.playback-toggle(
			@click.native='SET_PLAYBACK({ state: isPlaying ? "pause" : "play", trackId })',
			:class='isPlaying ? "pause" : "play"') {{ isPlaying ? 'pause_circle_filled' : 'play_circle_filled' }}

		img.cover-image(
			v-lazy='image[0].url',
			:alt='title')

	// index
	ma-icon.is-playing(v-if='!$mq.phone && isPlaying') {{ currentPlayback.is_playing ? 'volume_up' : 'volume_down' }}
	span.index(v-else-if='!image || !$mq.phone') {{ formatIndex(index) }}

	// meta
	.meta-container
		span.title {{ title }}
		.artist-container(v-if='artists')
			router-link.artist(
				v-for='artist in artists',
				:key='artist.id',
				:to='{ name: artist.type, params: { id: artist.id }}') {{ artist.name }}
	.label-container(v-if='explicit || popularity')
		ma-icon.popular(v-if='popularity && popularity > 80', :hover='true', v-tooltip='{ content: $t("popular") }') stars
		ma-icon.explicit(v-if='explicit', :hover='true', v-tooltip='{ content: $t("explicit") }') explicit

	// album name
	.album-container(v-if='album')
		router-link.album(:to='{ name: album.type, params: { id: album.id }}') {{ album.name }}

	// duration
	span.duration {{ formatTime(duration) }}

	// actions
	.action-container(v-if='!$mq.phone')
		ma-icon.playlistadd(:hover='true', v-tooltip='{ content: $t("addtoplaylist") }') playlist_add
		ma-icon.explicit(:hover='true', v-tooltip='{ content: $t("more") }') more_horiz
</template>

<script>
import {
  mapGetters,
  mapActions,
} from 'vuex';

export default {
  data() {
    return {
      isPlaying: false,
    };
  },
  props: {
    index: Number,
    type: String,
    title: String,
    artists: Array,
    album: Object,
    duration: Number,
    trackId: String,
    image: Array,
    explicit: Boolean,
    popularity: Number,
  },
  created() {
    this.getPlayingState();
  },
  watch: {
    // call again if value changes
    'currentPlayback.item.id': 'getPlayingState',
  },
  methods: {
    ...mapActions(['GET_PLAYBACK', 'SET_PLAYBACK']),

    // check if track is currently playing
    getPlayingState() {
      const self = this,
        isPlayingTrack = (self.currentPlayback.item.id === self.trackId),
        isHistoryView = self.$route.path === '/history';

      if (isPlayingTrack && !isHistoryView) {
        self.isPlaying = true;
      } else {
        self.isPlaying = false;
      }
    },

    // format index to 2 digits
    formatIndex(value) {
      let index = value;

      if (index < 99) {
        index = String(`0${value + 1}`).slice(-2);
      } else {
        index = (value + 1);
      }
      return index;
    },

    // time to human readable
    formatTime(value) {
      let time = value;
      const minutes = Math.floor(value / 60000),
        seconds = ((value % 60000) / 1000).toFixed(0);

      if (typeof time === 'number') {
        time = `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
      }
      return time;
    },
  },
  computed: {
    ...mapGetters({
      currentPlayback: 'getCurrentPlayback',
    }),
  },
};
</script>

<style lang='scss'>
.list {
    display: grid;
    grid-auto-rows: 75px;
    grid-row-gap: 2px;
    .list-item {
        @include font($color: rgba($white, 0.7));
        display: grid;
        align-items: center;
        padding-right: 2em;
        background-color: $blue;
        transition: background-color 0.3s;
        grid-template-columns: 75px minmax(auto, 1fr) minmax(auto, 60px) minmax(auto, 1fr) repeat(2, minmax(auto, 80px));
        grid-template-areas: "index meta labels album duration actions";
        grid-column-gap: 1em;
        @media (max-width: $mobile-breakpoint) {
            grid-template-columns: 75px minmax(auto, 1fr) minmax(auto, 30px);
        }
        &.has-image {
            grid-template-columns: 75px 50px minmax(auto, 1fr) minmax(auto, 60px) minmax(auto, 1fr) repeat(2, minmax(auto, 80px));
            grid-template-areas: "image index meta labels album duration actions";
            @media (max-width: $mobile-breakpoint) {
              grid-template-columns: 75px minmax(auto, 1fr) minmax(auto, 60px) minmax(auto, 1fr) minmax(auto, 50px);
              grid-template-areas: "image meta labels album duration";
            }
        }
        &:hover {
            background-color: rgba($white, 0.1);
            cursor: pointer;
            .image-container {
                .playback-toggle {
                    @include font($color: $white);
                }
                .cover-image {
                    filter: brightness(50%);
                }
            }
        }

        .index,
        .is-playing {
            @include font($size: 1.4em, $weight: 300, $color: $white);
            margin: auto;
        }

        .is-playing {
            @include font($size: 1.7em);
        }

        .image-container {
            @include relative;
            width: 75px;
            grid-area: image;
            background-color: lighten($blue, 2%);
            .cover-image {
               @include lazy-fadein;
            }
            .playback-toggle {
                @include absolute($all: 0, $index: 1);
                @include flex($display: flex, $justify: center, $align: center);
                @include font($size: 2.5em, $color: rgba($white, 0));
                transition: color 0.3s;
            }
        }

        .meta-container {
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
            grid-area: meta;
            .title {
                @include font($size: 1.1em, $weight: 600, $color: $white);
            }
            .artist-container {
                overflow: hidden;
                margin-top: 5px;
                text-overflow: ellipsis;
                .artist {
                    @include comma-separated($size: 1em);
                }
            }
        }

        .album-container {
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
            grid-area: album;
            .album {
                @include comma-separated($size: 1em);
            }
        }

        .label-container {
            grid-area: labels;
            @include flex($display: flex, $justify: space-between, $align: center);
        }

        .duration {
            grid-area: duration;
        }

        .action-container {
            grid-area: actions;
            @include flex($display: flex, $justify: space-between, $align: center);
        }
    }
}
</style>
