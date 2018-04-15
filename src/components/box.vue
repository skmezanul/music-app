<template>
  <router-link
  class="c-box"
  tag="div"
  :class="itemClass"
  @mouseover.native="overlay = true"
  @mouseleave.native="overlay = false"
  :to="{ name: type, params: { id: primaryid, owner: secondaryid }}"
  >

      <!-- overlay -->
      <transition name="fade" @beforeEnter="getColorFromAlbumCover">
          <div
          class="c-box__overlay"
          v-show="hasOverlay && overlay"
          :style="{ background: `linear-gradient(to top, rgba(${color}, 1) 30%, rgba(80, 80, 80, 0.5) 100%)` }"
          >

              <div class="c-box__overlayInner">

                  <!-- favorite -->
                  <a class="c-box__overlayIcon">
                    <ma-icon :hover="true">favorite</ma-icon>
                  </a>

                  <!-- playback toggle -->
                  <a @click.prevent="togglePlaying" class="c-box__overlayIcon">
                    <ma-icon type="toggle">{{ isPlaying ? 'pause_circle_filled' : 'play_circle_filled' }}</ma-icon>
                  </a>

                  <!-- more options -->
                  <a class="c-box__overlayIcon">
                    <ma-icon :hover="true">more_horiz</ma-icon>
                  </a>

              </div>

          </div>
      </transition>

      <!-- image -->
      <div class="c-box__image" v-if="image[0]">

        <img
        class="c-box__coverImage"
        v-lazy="image[0].url"
        :alt="title"
        />

      </div>

      <!-- meta -->
      <div class="c-box__meta">
          <div class="c-box__metaInner">

            <!-- title -->
            <span>{{ title }}</span>

            <!-- artists -->
            <div class="c-box__artists" v-if="artists">

                <router-link
                v-for="artist in artists"
                :key="artist.id"
                :to="{ name: artist.type, params: { id: artist.id }}"
                >

                {{ artist.name }}

                </router-link>

            </div>

          </div>
      </div>
  </router-link>
</template>

<script>
import * as Vibrant from 'node-vibrant';

export default {

  data: () => ({
    isPlaying: false,
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
      this.isPlaying = !this.isPlaying;
    },

    // get overlay color from album cover
    getColorFromAlbumCover() {
      const self = this,
        overlayColor = self.color,
        albumCover = self.image[0].url;

      if (!overlayColor && albumCover) {
        Vibrant.from(albumCover).getPalette()
          .then(({ Muted }) => {
            self.color = Muted.getRgb();
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

    // item modifier class
    itemClass() {
      const self = this,
        { type } = self;

      return type ? `c-box--${type}` : null;
    },
  },

};
</script>
