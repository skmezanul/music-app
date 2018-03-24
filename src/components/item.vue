<template lang='pug'>
router-link.section-item(
	tag='div',
	:class='type',
	@mouseover.native='overlay = true',
	@mouseleave.native='overlay = false',
	:to='{ name: type, params: { id: primaryid, owner: secondaryid }}')

	// overlay
	transition(name='fade', @beforeEnter='getColorFromAlbumCover')
		.item-overlay(
			v-show='hasOverlay && overlay',
			:style='{ background: `linear-gradient(to top, rgba(${color}, 1) 30%, rgba(80, 80, 80, 0.5) 100%)` }')

			.overlay-inner
				ma-icon.overlay-icon.favorite(:hover='true') favorite

				ma-icon.overlay-icon.playback-toggle(
					@click.prevent.native='togglePlaying',
					:class='playing ? "pause" : "play"') {{ playing ? 'pause_circle_filled' : 'play_circle_filled' }}

				ma-icon.overlay-icon.more(:hover='true') more_horiz

	// image
	.image-container(v-if='image')
		img.cover-image(
			v-lazy='image[0].url',
			:alt='title')

	// meta
	.meta-container
		.meta-container-inner
			span.meta {{ title }}
			.artist-container(v-if='artists')
				router-link.artist(
					v-for='artist in artists',
					:key='artist.id',
					:to='{ name: artist.type, params: { id: artist.id }}') {{ artist.name }}
</template>

<script>
import * as Vibrant from 'node-vibrant';

export default {
  data: () => ({
    playing: false,
    overlay: false,
    color: '',
  }),

  props: {
    type: {
      type: String,
      default: 'album',
    },
    primaryid: {
      type: String,
      required: true,
    },
    secondaryid: {
      type: String,
      default: '',
    },
    title: {
      tyoe: String,
      required: true,
    },
    artists: {
      type: Array,
      default: () => [],
    },
    image: {
      type: Array,
      required: true,
    },
  },

  methods: {
    // toggle playing state
    togglePlaying() {
      this.playing = !this.playing;
    },

    // get overlay color from album cover
    getColorFromAlbumCover() {
      const self = this,
        overlayColor = self.color,
        albumCover = self.image[0].url;
      if (!overlayColor && albumCover) {
        Vibrant.from(albumCover).getPalette()
          .then((palette) => {
            self.color = palette.Muted.getRgb();
          });
      }
    },
  },

  computed: {
    // check if has overlay
    hasOverlay() {
      const self = this,
        hasOverlay = /(album|playlist)/.test(self.type);
      return hasOverlay;
    },
  },

};
</script>

<style lang='scss'>
.section-item {
    @include relative;
    @include flex($display: flex, $justify: space-between, $direction: column);
    overflow: hidden;
    height: 100%;
    background-color: $blue;
    cursor: pointer;
    transition: box-shadow 0.3s;
    &:hover {
        box-shadow: $shadow-highlight;
    }
    .image-container {
        @include flex($display: flex, $justify: center, $align: center);
        background-color: lighten($blue, 2%);
        overflow: hidden;
        .cover-image {
           @include lazy-fadein;
        }
    }
    .item-overlay {
        @include absolute($all: 0, $index: 1);
        @include flex($display: flex, $justify: center);
        background: linear-gradient(to top, var(--accent-color) 25%, rgba(80, 80, 80, 0.5) 100%);
        .overlay-inner {
            @include flex($display: flex, $justify: space-around, $align: center, $flex: 0.8);
            .overlay-icon {
                &.playback-toggle {
                    @include font($size: 4.5em);
                    transition: transform 0.3s;
                    &:hover {
                        transform: scale(1.1);
                    }
                }
            }
        }
    }
    .meta-container {
        @include flex($display: flex, $justify: center);
        padding: 15px;
        .meta-container-inner {
            @include font($line: 1.4em);
            z-index: 2;
            overflow: hidden;
            text-align: center;
            text-overflow: ellipsis;
            white-space: nowrap;
            .meta {
                @include font($weight: 600);
            }
            .artist-container {
                .artist {
                    @include comma-separated($size: 0.95em);
                }
            }

        }
    }
    &.artist,
    &.category {
        .meta-container {
            @include absolute($all: 0, $index: 1);
            @include item-hover;
            @include flex($justify: center, $align: flex-end);
            padding-bottom: 40px;
            height: 100%;
            .meta-container-inner {
                @include font($size: 1.3em);
            }
        }
        .image-container {
            .cover-image {
                transition: transform 0.7s, filter 0.3s;
                will-change: transform;
            }
        }
        &:hover {
            .image-container {
                .cover-image {
                    transform: scale(1.07);
                }
            }
        }
    }
    &.artist {
        height: 300px;
        .meta-container {
            background: linear-gradient(to top, rgba($black,0.7), rgba($black,0));
        }
        .image-container {
            .cover-image {
                width: auto;
                filter: brightness(70%) contrast(110%);
            }
        }
        &:hover {
            .image-container {
                .cover-image {
                    filter: brightness(100%) contrast(100%);
                }
            }
        }
    }
    &.category {
        .image-container {
            .cover-image {
                transform: scale(1.02);
            }
        }
    }
    &.playlist {
        .meta-container {
            padding: 20px 15px;
        }
    }
}
</style>
