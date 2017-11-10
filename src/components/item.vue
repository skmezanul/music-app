<template lang="pug">
.section-item(:class='type')
  router-link.section-item-inner(
    tag='div',
    @mouseover.native='overlay = true',
    @mouseleave.native='overlay = false',
    :to='$toRoute(type, { id: primaryid, owner: secondaryid })')

    // overlay
    transition(name='fade')
      .item-overlay(
        v-if='hasOverlay && overlay',
        :style='{ background: color }')

        .overlay-inner
          i.favorite.material-icons favorite

          i.play.material-icons(
            v-if='!playing',
            @click.prevent='togglePlaying') play_circle_filled

          i.play.material-icons(
            v-if='playing',
            @click.prevent='togglePlaying') pause_circle_filled

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
        .artist-container(v-if='artist')
          router-link.artist(
            v-for='item in artist',
            :key='item.id',
            :to='$toRoute("artist", { id: item.id })') {{ item.name }}
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
    'artist',
    'image',
  ],
  watch: {
    'overlay': 'getColorFromAlbumCover',
  },
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
      if (!overlayColor) {
        Vibrant.from(albumCover).getPalette()
          .then((palette) => {
            const r = Math.round(palette.Muted._rgb[0]),
                  g = Math.round(palette.Muted._rgb[1]),
                  b = Math.round(palette.Muted._rgb[2]),
                  a = 1,
                  color = `rgba(${r}, ${g}, ${b}, ${a})`;

            that.color = `linear-gradient(to top, ${color} 25%, rgba(80, 80, 80, 0.5) 100%)`;
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
    @include flex($flex: 1, $basis: 20%);
    padding: 7px;
    max-width: 20%;
    @media (max-width: $breakpoint-mobile) {
        @include flex($basis: 50%);
        max-width: 50%;
    }
    &.artist,
    &.category {
        .section-item-inner {
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
    }
    &.artist {
        @include flex($basis: 25%);
        max-width: 25%;
        .section-item-inner {
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
    }
    &.category {
      @include flex($basis: 20%);
      max-width: 20%;
      .section-item-inner {
        .image-container {
          img {
            transform: scale(1.02);
          }
        }
      }
    }
    &.playlist {
        .section-item-inner {
            .meta-container {
                padding: 20px 15px;
            }
        }
    }
    .section-item-inner {
        @include relative;
        @include flex($display: flex, $justify: space-between, $direction: column);
        overflow: hidden;
        height: 100%;
        background-color: $blue;
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
                    &.play {
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
                z-index: 2;
                overflow: hidden;
                text-align: center;
                text-overflow: ellipsis;
                white-space: nowrap;
                @include font($line: 1.4em);
                .artist-container {
                    a {
                        @include comma-separated($size: 0.95em, $weight: 200);
                    }
                }

            }
        }
    }
}
</style>
