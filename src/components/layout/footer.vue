<template>
  <footer v-if="currentPlayback" class="c-footer">

      <!-- current playback -->
      <div class="c-footer__inner c-footer__inner--left" :class="{ 'is-coverHidden' : settings.largeCover }">

          <!-- cover -->
          <router-link
          class="c-footer__cover"
          tag="div"
          :to="{ name: 'artist', params: { id: currentPlayback.item.artists[0].id }}"
          >

              <!-- large cover button -->
              <ma-button
              type="overlay"
              @click.prevent.native="setAppSettings({ largeCover: true })"
              icon="keyboard_arrow_up"
              ></ma-button>

              <!-- cover image -->
              <img
              class="c-footer__coverImage"
              v-lazy="currentPlayback.item.album.images[0].url"
              :alt="currentPlayback.item.name"
              />

          </router-link>


          <div class="c-footer__playback">

              <!-- title -->
              <router-link
              class="c-footer__playbackTitle"
              :to="{ name: 'album', params: { id: currentPlayback.item.album.id }}"
              >

              {{ currentPlayback.item.name }}

              </router-link>

              <div v-if="currentPlayback.item.artists" class="c-footer__playbackArtists">

                  <!-- artists -->
                  <router-link
                  v-for="artist in currentPlayback.item.artists"
                  :key="artist.id"
                  :to="{ name: 'artist', params: { id: artist.id }}"
                  >

                  {{ artist.name }}

                  </router-link>

              </div>

          </div>
          <transition name="fade">
              <div class="c-footer__background" v-show="!settings.largeCover"><img class="c-footer__backgroundImage" v-lazy="currentPlayback.item.album.images[0].url" :alt="currentPlayback.item.name" /></div>
          </transition>
      </div>

      <!-- playback controls -->
      <div class="c-footer__inner c-footer__inner--middle">

          <!-- shuffle icon -->
          <ma-icon
          class="c-icon--shuffle"
          :hover="true"
          @click.native="setShuffle"
          :class="{ 'active': currentPlayback.shuffle_state }"
          v-tooltip="{ content: $t('shuffle') }"
          >

          shuffle

          </ma-icon>

          <!-- skip icon -->
          <ma-icon
          class="c-icon--skip"
          :hover="true"
          @click.native="skipTo({ direction: 'previous' })"
          >

          skip_previous

          </ma-icon>

          <!-- playback toggle icon -->
          <ma-icon
          class="c-icon--toggle"
          :hover="true"
          :class="isPlaying ? 'pause' : 'play'"
          @click.native="togglePlayback"
          >

          {{ isPlaying ? 'pause_circle_filled' : 'play_circle_filled' }}

          </ma-icon>

          <!-- skip icon -->
          <ma-icon
          class="c-icon--skip"
          :hover="true"
          @click.native="skipTo({ direction: 'next' })"
          >

          skip_next

          </ma-icon>

          <!-- repeat icon -->
          <ma-icon
          class="c-icon--repeat"
          :hover="true"
          v-if="currentPlayback.repeat_state != 'track'"
          @click.native="toggleRepeat"
          :class="{ 'active': currentPlayback.repeat_state == 'context' }"
          v-tooltip="{ content: $t('repeat') }"
          >

          repeat

          </ma-icon>

          <!-- repeat icon -->
          <ma-icon
          class="c-icon--repeat"
          :hover="true"
          v-if="currentPlayback.repeat_state == 'track'"
          @click.native="toggleRepeat"
          v-tooltip="{ content: $t('repeat') }"
          >

          repeat_one

          </ma-icon>
      </div>

      <!-- other controls -->
      <div class="c-footer__inner c-footer__inner--right">

          <!-- video icon -->
          <ma-icon
          :hover="true"
          @click.native="$modal.show('video')"
          v-tooltip="{ content: $t('watchvideo') }"
          >

          music_video

          </ma-icon>

          <!-- playback time -->
          <div class="c-footer__playbackTime">
            <span class="c-footer__playbackTimeProgress">{{ trackProgress }}</span>
            <span class="c-footer__playbackTimeDuration">{{ trackDuration }}</span>
          </div>

      </div>

      <!-- progress bar -->
      <div
      class="c-footer__playbackProgress"
      @click="jumpToProgress"
      ref="progressContainer"
      >

        <progress
        class="c-footer__playbackProgressBar"
        ref="progressBar"
        :max="duration"
        ></progress>

      </div>

  </footer>
</template>

<script>
import {
  mapActions,
  mapGetters,
  mapMutations,
} from 'vuex';

import { TweenLite, Linear } from 'gsap';

export default {

  data: () => ({
    currentProgress: 0,
    progressInterval: null,
  }),

  created() {
    this.updateProgress();
  },

  watch: {
    // watch the progress and update it when it changes
    progress() {
      this.updateProgress();
    },

    // watch the playback state and start / stop the interval accordingly
    isPlaying() {
      this.updateProgress();
    },

    // reset timeout when playback is at the end of the track
    currentProgress(value) {
      const self = this,
        { progressBar } = self.$refs;

      TweenLite.to(progressBar, 1, {
        attr: {
          value,
        },
        ease: Linear.easeNone,
      });

      if (value >= self.duration) {
        clearInterval(self.progressInterval);
      }
    },
  },

  methods: {
    ...mapActions({
      skipTo: 'playback/SKIP_TO',
      seekTo: 'playback/SEEK_TO',
      toggleRepeat: 'playback/TOGGLE_REPEAT',
      setShuffle: 'playback/SET_SHUFFLE',
      togglePlayback: 'player/TOGGLE_PLAYBACK',
    }),

    ...mapMutations('app', {
      setAppSettings: 'SET_APP_SETTINGS',
    }),

    // add one second to the progress every second
    updateProgress() {
      const self = this,
        // half a second in milliseconds
        oneSecond = 1000;

      // clear the interval before starting a new one
      clearInterval(self.progressInterval);

      // set local progress to current progress from the api
      self.currentProgress = self.progress;

      if (self.isPlaying) {
        // count up 500 milliseconds every 500 milliseconds
        self.progressInterval = setInterval(() => {
          self.currentProgress += oneSecond;
        }, oneSecond);
      }
    },

    // jump to progress
    jumpToProgress(event) {
      const self = this,
        { progressContainer } = self.$refs,
        progressBarWidth = progressContainer.offsetWidth,
        clickedPosition = (event.clientX / progressBarWidth) * 100,
        position = Math.round((self.duration / 100) * clickedPosition);

      if (progressContainer && position) {
        self.seekTo({
          position,
        }).then(() => {
          self.currentProgress = position;
        });
      }
    },
  },

  computed: {
    ...mapGetters({
      currentPlayback: 'playback/getCurrentPlayback',
      settings: 'app/getAppSettings',
      duration: 'playback/getDuration',
      progress: 'playback/getProgress',
      isPlaying: 'playback/getPlayingState',
    }),

    // get human readable track progress
    trackProgress() {
      const self = this,
        minutes = Math.floor(self.currentProgress / 60000),
        seconds = ((self.currentProgress % 60000) / 1000).toFixed(0);

      return self.currentProgress >= 0 ? `${minutes}:${seconds < 10 ? '0' : ''}${seconds}` : 0;
    },

    // get human readable track duration
    trackDuration() {
      const self = this,
        minutes = Math.floor(self.duration / 60000),
        seconds = ((self.duration % 60000) / 1000).toFixed(0);

      return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
    },
  },

};
</script>
