<template lang="pug">
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
			:style='{ background: color }')

			.overlay-inner
				i.favorite.material-icons favorite

				i.playback-toggle.material-icons(
					@click.prevent='togglePlaying', :class='[ playing ? "pause" : "play" ]') {{ playing ? 'pause_circle_filled' : 'play_circle_filled' }}

				i.more.material-icons more_horiz

	// image
	.image-container(v-if='image')
		img(
			:src='image[0].url',
			:alt='title')

	// meta
	.meta-container
		.meta-container-inner
			span {{ title }}
			.artist-container(v-if='artists')
				router-link.artist(
					v-for='artist in artists',
					:key='artist.id',
					:to='{ name: artist.type, params: { id: artist.id }}') {{ artist.name }}
</template>

<script>
import * as Vibrant from 'node-vibrant';

export default {
  data() {
    return {
      playing: false,
      overlay: false,
      color: '',
    }
  },
  props: [
    'type',
    'primaryid',
    'secondaryid',
    'title',
    'artists',
    'image',
  ],
  methods: {
    // toggle playing state
    togglePlaying() {
      this.playing = !this.playing;
    },

    // get overlay color from album cover
    getColorFromAlbumCover() {
      const that = this,
            overlayColor = that.color,
            albumCover = that.image[0].url;
      if (!overlayColor && albumCover) {
        Vibrant.from(albumCover).getPalette()
          .then((palette) => {
            const fromColor = `rgba(${palette.Muted.getRgb()}, 1)`,
              toColor = 'rgba(80, 80, 80, 0.5)';

            that.color = `linear-gradient(to top, ${fromColor} 30%, ${toColor} 100%)`;
          });
      }
    },
  },
  computed: {
    // check if has overlay
    hasOverlay() {
      const hasOverlay = this.type === 'album' || this.type === 'playlist';
      if (hasOverlay) {
        return true;
      };
      return false;
    },
  },
};
</script>

<style lang="scss">
.section-item {
    @include relative;
    @include flex($display: flex, $justify: space-between, $direction: column);
    overflow: hidden;
    height: 100%;
    background-color: $grey;
    transition: box-shadow 0.3s;
    &:hover {
        cursor: pointer;
    }
    .image-container {
        @include flex($display: flex, $justify: center, $align: center);
        overflow: hidden;
        width: 100%;
        height: auto;
        img {
            width: 100%;
        }
    }
    .item-overlay {
        @include absolute($top: 0, $right: 0, $bottom: 0, $left: 0, $z-index: 1);
        @include flex($display: flex, $justify: center);
        background: linear-gradient(to top, var(--accent-color) 25%, rgba(80, 80, 80, 0.5) 100%);
        .overlay-inner {
            @include flex($display: flex, $justify: space-around, $align: center, $flex: 0.8);
            i {
                transition: color 0.3s;
                &:not(.play) {
                    @include item-hover;
                }
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
            .artist-container {
                a {
                    @include comma-separated($size: 0.95em, $weight: 200);
                }
            }

        }
    }
    &.artist,
    &.category {
        .meta-container {
            @include absolute($top: 0, $right: 0, $bottom: 0, $left: 0, $z-index: 1);
            @include item-hover;
            @include flex($justify: center, $align: flex-end);
            padding-bottom: 40px;
            height: 100%;
            .meta-container-inner {
                @include font($size: 1.3em);
            }
        }
        .image-container {
            img {
                transition: transform 0.7s, filter 0.3s;
                will-change: transform;
            }
        }
        &:hover {
            .image-container {
                img {
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
            img {
                width: auto;
                filter: brightness(70%) contrast(110%);
            }
        }
        &:hover {
            .image-container {
                img {
                    filter: brightness(100%) contrast(100%);
                }
            }
        }
    }
    &.category {
        .image-container {
            img {
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
