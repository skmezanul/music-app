<template>
<li class="c-list" @dblclick="setPlayback({ state: 'play', trackId })" :class="{ 'is-playing' : isCurrentlyPlaying, 'c-list--image' : image[0] }">

    <!-- image -->
    <div class="c-list__image" v-if="image[0]">

        <!-- play icon over image -->
        <a class="c-list__playbackToggle" @click="setPlayback({ state: isCurrentlyPlaying ? 'pause' : 'play', trackId })">
            <ma-icon type="small">

            {{ isCurrentlyPlaying ? 'pause_circle_filled' : 'play_circle_filled' }}

            </ma-icon>
        </a>

        <img
        class="c-list__coverImage"
        v-lazy="image[0].url"
        :alt="title"
        />

    </div>

    <div class="c-list__info">

        <!-- playing icon -->
        <span class="c-list__playingIcon" v-if="isCurrentlyPlaying">
          <ma-icon type="small">{{ isPlaying ? 'volume_up' : 'volume_down' }}</ma-icon>
        </span>

        <!-- index -->
        <span class="c-list__index" v-else>{{ formatIndex(index) }}</span>

    </div>

    <!-- meta -->
    <div class="c-list__meta">

      <!-- title -->
      <span class="c-list__title">{{ title }}</span>

      <!-- artists -->
      <div class="c-list__artists" v-if="artists">

          <router-link
          v-for="artist in artists"
          :key="artist.id"
          :to="{ name: artist.type, params: { id: artist.id }}"
          >

          {{ artist.name }}

          </router-link>

      </div>

    </div>

    <!-- labels -->
    <div class="c-list__labels" v-if="explicit || popularity">

        <!-- icon if popular -->
        <span v-if="popularity && popularity > 80" v-tooltip="{ content: $t('popular') }">
            <ma-icon :hover="true">

            stars

            </ma-icon>
        </span>

        <!-- icon if explicit -->
        <span v-if="explicit" v-tooltip="{ content: $t('explicit') }">
            <ma-icon :hover="true">

            explicit

            </ma-icon>
        </span>

    </div>

    <!-- album name -->
    <div class="c-list__album" v-if="album">
        <router-link :to="{ name: album.type, params: { id: album.id }}">{{ album.name }}</router-link>
    </div>

    <!-- duration -->
    <span class="c-list__duration">{{ formatTime(duration) }}</span>

    <!-- actions -->
    <div class="c-list__actions">

        <!-- add to playlist -->
        <a v-tooltip="{ content: $t('addtoplaylist') }">
            <ma-icon :hover="true">

            playlist_add

            </ma-icon>
        </a>

        <!-- more options -->
        <a v-tooltip="{ content: $t('more') }">
            <ma-icon :hover="true">

            more_horiz

            </ma-icon>
        </a>
    </div>

</li>
</template>

<script>
import {
  mapGetters,
  mapActions,
} from 'vuex';

export default {

  props: {
    index: {
      type: Number,
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    artists: {
      type: Array,
      default: () => [],
    },
    album: {
      type: Object,
      default: () => {},
    },
    duration: {
      type: Number,
      required: true,
    },
    trackId: {
      type: String,
      required: true,
    },
    image: {
      type: Array,
      default: () => [],
    },
    explicit: {
      type: Boolean,
      default: false,
    },
    popularity: {
      type: Number,
      default: null,
    },
  },

  methods: {
    ...mapActions({
      setPlayback: 'playback/SET_PLAYBACK',
    }),

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
    ...mapGetters('playback', {
      currentPlayback: 'getCurrentPlayback',
      isPlaying: 'getPlayingState',
    }),

    // check if track is currently playing
    isCurrentlyPlaying() {
      const self = this,
        isPlayingTrack = (self.currentPlayback.item.id === self.trackId),
        isHistoryView = self.$route.path === '/history',
        isCurrentlyPlaying = isPlayingTrack && !isHistoryView;

      return isCurrentlyPlaying;
    },
  },

};
</script>
