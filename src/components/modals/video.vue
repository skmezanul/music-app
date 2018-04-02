<template>
<ma-modal
name="video"
height="100%"
width="100%"
transition="fade"
:adaptive="true"
:clickToClose="false"
@mouseover.native="overlay = true"
@mouseleave.native="overlay = false"
@before-open="fetchData"
@opened="setPlayback({ state: 'pause' })"
@closed="setPlayback({ state: 'play' })">

    <transition name="fade">
        <div class="c-videoOverlay" v-show="overlay">

            <!-- video overlay -->
            <div class="c-videoOverlay__inner">

                <!-- title -->
                <h1 class="c-videoOverlay__title">{{ currentPlayback.item.name }}</h1>

                <!-- artists -->
                <div class="c-videoOverlay__artists">
                    <router-link v-for="artist in currentPlayback.item.artists" :key="artist.id" @click.native="closeVideo" :to="{ name: 'artist', params: { id: artist.id }}">{{ artist.name }}</router-link>
                </div>

            </div>

            <!-- close button -->
            <ma-button type="overlay" @click.native="closeVideo" icon="close"></ma-button>

        </div>
    </transition>

    <!-- iframe -->
    <iframe
    v-if="videoId"
    width="100%" 
    height="100%"
    frameborder="0"
    :src="`https://www.youtube-nocookie.com/embed/${videoId}?${options}`"
    ></iframe>

</ma-modal>
</template>

<script>
import {
  mapActions,
  mapGetters,
  mapMutations,
} from 'vuex';
import { stringify } from 'query-string';

export default {

  data: () => ({
    videoId: '',
    overlay: false,
    options: {
      autoplay: 1,
      iv_load_policy: 3,
      showinfo: 0,
      controls: 0,
    },
  }),

  created() {
    this.options = stringify(this.options);
  },

  methods: {
    ...mapActions({
      setPlayback: 'playback/SET_PLAYBACK',
    }),

    ...mapMutations('app', {
      showNotice: 'SET_NOTICE',
    }),

    fetchData() {
      const self = this;

      self.axios.all([
        self.getVideoId(),
      ]).then((res) => {
        self.videoId = res[0].data.items[0].id.videoId;
      }).catch((err) => {
        self.closeVideo();
        self.showNotice({
          action: 'add',
          type: 'error',
          message: `Error loading video: ${err.message}`,
        });
      });
    },

    // get video from the youtube api
    getVideoId() {
      const self = this,
        title = self.currentPlayback.item.name,
        artist = self.currentPlayback.item.artists[0].name;

      return self.$youtubeApi({
        method: 'get',
        url: '/search',
        params: {
          q: `${title} ${artist}`,
        },
      });
    },

    // close video modal
    closeVideo() {
      this.$modal.hide('video');
    },
  },

  computed: {
    ...mapGetters('playback', {
      currentPlayback: 'getCurrentPlayback',
    }),
  },

};
</script>
