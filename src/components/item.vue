<template lang="pug">
.section-item(:class='type')
	router-link.section-item-inner(
    tag='div',
    :to='toTarget(type, primaryid, secondaryid)')

		// overlay
		.item-overlay(
      v-if='hasOverlay',
      :style='{ background: color }')

			.overlay-inner
				i.favorite.material-icons favorite

				i.play.material-icons(
          v-if='!playing',
          @click='togglePlaying') play_circle_filled

				i.play.material-icons(
          v-if='playing',
          @click='togglePlaying') pause_circle_filled

				i.more.material-icons more_horiz

		// image
		.image-container(v-if='image')
			img(
        :src='image',
        :alt='title')

		// meta
		.meta-container
			.meta-container-inner
				span {{ title }}
				.artist-container(v-if='artist')
					router-link.artist(
            v-for='item in artist',
            :key='item.id',
            :to='toTarget(item.type, item.id)') {{ item.name }}
</template>

<script>
import * as Vibrant from 'node-vibrant';

export default {
  data() {
    return {
      playing: false,
      color: '',
    };
  },
  props: [
    'type',
    'primaryid',
    'secondaryid',
    'title',
    'artist',
    'image',
  ],
  mounted() {
    this.getColor();
  },
  methods: {
    // to target
    toTarget(name, id, owner) {
      const target = {
        name,
        params: {
          id,
          owner,
        },
      };
      return target;
    },

    // toggle playing state
    togglePlaying() {
      this.playing = !this.playing;
    },

    // get color from image
    getColor() {
      const that = this;
      Vibrant.from(that.image).getPalette()
        .then((palette) => {
        const r = Math.round(palette.Muted._rgb[0]);
        const g = Math.round(palette.Muted._rgb[1]);
        const b = Math.round(palette.Muted._rgb[2]);
        const a = 1;
        const color = `rgba(${r}, ${g}, ${b}, ${a})`;
        that.color = `linear-gradient(to top, ${color} 25%, rgba(80, 80, 80, 0.5) 100%)`;
      }).catch(() => {
        that.color = '';
      });
    },
  },
  computed: {
    hasOverlay() {
      if (this.type === 'album' || this.type === 'playlist') {
        return true;
      };
      return false;
    },
  },
};
</script>

<style lang="scss">
.section-item {
    flex: 1;
    flex-basis: 20%;
    padding: 7px;
    max-width: 20%;
    @media screen and (max-width: 955px) {
        flex-basis: 50% !important;
        max-width: 50% !important;
    }
    &.artist,
    &.category {
        flex-basis: 25%;
        max-width: 25%;
        .section-item-inner {
            .meta-container {
                position: absolute;
                top: 0;
                right: 0;
                bottom: 0;
                left: 0;
                align-items: flex-end;
                justify-content: center;
                padding-bottom: 40px;
                height: 100%;
                .meta-container-inner {
                    font-size: 1.3em;
                }
            }
            .image-container {
                img {
                    width: auto;
                    height: 100%;
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
        .section-item-inner {
            height: 300px;
            .meta-container {
                background: linear-gradient(to top, rgba($black,0.7), rgba($black,0));
            }
            .image-container {
                img {
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
    &.playlist {
        .section-item-inner {
            .meta-container {
                padding: 20px 15px;
            }
        }
    }
    .section-item-inner {
        position: relative;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        overflow: hidden;
        height: 100%;
        background-color: $blue;
        box-shadow: $shadow;
        transition: box-shadow 0.3s;
        &:hover {
            box-shadow: $shadow-highlight;
            cursor: pointer;
            .item-overlay {
                opacity: 1;
            }
        }
        .image-container {
            display: flex;
            align-items: center;
            justify-content: center;
            overflow: hidden;
            width: 100%;
            height: auto;
            img {
                width: 100%;
                height: auto;
            }
        }
        .item-overlay {
            position: absolute;
            top: 0;
            right: 0;
            bottom: 0;
            left: 0;
            z-index: 1;
            display: flex;
            background: linear-gradient(to top, $accent-color 25%, rgba(80, 80, 80, 0.5) 100%);
            justify-content: center;
            opacity: 0;
            transition: opacity 0.3s;
            .overlay-inner {
                display: flex;
                flex: 0.8;
                align-items: center;
                justify-content: space-around;
                i {
                    transition: color 0.3s;
                    &:not(.play) {
                        @include item-hover;
                    }
                    &.play {
                        font-size: 4.5em;
                        transition: transform 0.3s;
                        &:hover {
                            transform: scale(1.1);
                        }
                    }
                }
            }
        }
        .meta-container {
            display: flex;
            justify-content: center;
            padding: 15px;
            .meta-container-inner {
                z-index: 2;
                overflow: hidden;
                text-align: center;
                text-overflow: ellipsis;
                white-space: nowrap;
                line-height: 1.4em;
                .artist-container {
                    a {
                        @include comma-separated(0.95em, 300);
                    }
                }

            }
        }
    }
}
</style>
