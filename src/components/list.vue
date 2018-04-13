<template>
<li class="c-list" @dblclick="setPlayback({ state: 'play', trackId })" :class="{ 'is-playing' : isCurrentlyPlaying, 'c-list--image' : image[0] }">

    <!-- image -->
    <div class="c-list__image" v-if="image[0]">

        <!-- play icon over image -->
        <ma-icon
        class="c-list__playbackToggle"
        @click.native="setPlayback({ state: isCurrentlyPlaying ? 'pause' : 'play', trackId })"
        :class="isCurrentlyPlaying ? 'pause' : 'play'"
        >

        {{ isCurrentlyPlaying ? 'pause_circle_filled' : 'play_circle_filled' }}

        </ma-icon>

        <img
        class="c-list__coverImage"
        v-lazy="image[0].url"
        :alt="title"
        />

    </div>

    <div class="c-list__info">

        <!-- playing icon -->
        <ma-icon class="c-list__playingIcon" v-if="isCurrentlyPlaying">{{ isPlaying ? 'volume_up' : 'volume_down' }}</ma-icon>

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
        <ma-icon
        v-if="popularity && popularity > 80"
        :hover="true"
        v-tooltip="{ content: $t('popular') }">

        stars

        </ma-icon>

        <!-- icon if explicit -->
        <ma-icon
        v-if="explicit"
        :hover="true"
        v-tooltip="{ content: $t('explicit') }"
        >

        explicit

        </ma-icon>

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
        <ma-icon
        :hover="true"
        v-tooltip="{ content: $t('addtoplaylist') }"
        >

        playlist_add

        </ma-icon>

        <!-- more options -->
        <ma-icon
        :hover="true"
        v-tooltip="{ content: $t('more') }"
        >

        more_horiz

        </ma-icon>
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
