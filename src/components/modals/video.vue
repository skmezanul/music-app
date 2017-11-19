<template lang="pug">
ma-modal(
  name='video',
  height='100%',
  width='100%',
  transition='fade',
  :adaptive='true',
  :clickToClose='false',
  @mouseover.native='overlay = true',
  @mouseleave.native='overlay = false',
  @before-open='fetchData',
  @opened='SET_PLAYBACK({state: "pause"})',
  @closed='SET_PLAYBACK({state: "play"})')
  transition(name='fade')
    .overlay-container(v-show='overlay')
      .overlay-inner
        h1 {{ currentPlayback.item.name }}
        .artist-container
          router-link.artist(
            v-for='artist in currentPlayback.item.artists',
            :key='artist.id',
            @click.native='closeVideo',
            :to='{ name: "artist", params: { id: artist.id }}') {{ artist.name }}
      ma-button(
        type='overlay',
        @click.native='closeVideo',
        icon='close')

  iframe(
    v-if='videoid',
    width='100%',
    height='100%',
    frameborder='0',
    :src='`https://www.youtube-nocookie.com/embed/${videoid}?${options}`')
</template>

<script>
import { mapActions, mapGetters } from 'vuex';
import { stringify } from 'query-string';

export default {
  data() {
    return {
      videoid: '',
      overlay: false,
      options: {
        autoplay: 1,
        iv_load_policy: 3,
        showinfo: 0,
        controls: 0,
      },
    }
  },
  created() {
    this.options = stringify(this.options);
  },
  methods: {
    ...mapActions(['SET_PLAYBACK']),

    fetchData() {
      const self = this;

      self.axios.all([
          self.getVideoId(),
        ]).then((res) => {
          self.videoid = res[0].data.items[0].id.videoId;
        }).catch((err) => {
          self.$store.commit('ADD_NOTICE', `Error loading video: ${err.message}`);
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
    ...mapGetters({
      currentPlayback: 'getCurrentPlayback',
    }),
  },
};
</script>

<style lang="scss">
.v--modal-overlay {
    background: transparent;
    .v--modal {
        background: $black;
        .overlay-container {
          @include absolute($top: 0, $right: 0, $left: 0);
          @include flex($display: flex, $align: center);
          padding: 0 60px;
          height: 200px;
          background: ease-in-out-sine-gradient(to bottom, rgba($main-bg-color, 0.7), rgba($main-bg-color, 0));
            .overlay-inner {
                h1 {
                    margin-bottom: 10px;
                    @include font($size: 3em);
                }
                .artist-container {
                    a {
                        @include comma-separated($size: 1.2em, $weight: 200);
                    }
                }
            }
        }
    }
}
</style>
