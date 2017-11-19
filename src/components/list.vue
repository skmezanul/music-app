<template lang="pug">
li.list-item(
  @dblclick='SET_PLAYBACK({ state: "play", trackid })',
  :class='{ "playing" : isPlaying }')

  .index-container
    // image
    .image-container(v-if='image')
      i.playback-toggle.material-icons(
        @click='SET_PLAYBACK({ state: isPlaying ? "pause" : "play", trackid })',
        :class='isPlaying ? "pause" : "play"') {{ isPlaying ? 'pause_circle_filled' : 'play_circle_filled' }}

      img(
        :src='image[0].url',
        :alt='title')

    i.is-playing.material-icons(v-if='!$mq.phone && isPlaying') {{ currentPlayback.is_playing ? 'volume_up' : 'volume_down' }}
    span.index(v-else-if='!$mq.phone') {{ $formatValue(index, 'index') }}

  // meta
  .meta-container
    span.title {{ title }}
    .artist-container(v-if='artists')
      router-link(
        v-for='artist in artists',
        :key='artist.id',
        :to='{ name: artist.type, params: { id: artist.id }}') {{ artist.name }}
  .label-container(v-if='explicit')
    i.explicit.material-icons(
      v-tooltip='{ content: $t("explicit") }') explicit

  // album name
  .album-container(v-if='album')
    router-link(:to='{ name: album.type, params: { id: album.id }}') {{ album.name }}

  // duration
  span.duration {{ $formatValue(duration, 'time') }}

  // actions
  .action-container(v-if='!$mq.phone')
    i.playlistadd.material-icons(
      v-tooltip='{ content: $t("addtoplaylist") }') playlist_add
    i.more.material-icons(
      v-tooltip='{ content: $t("more") }') more_horiz
</template>

<script>
import { mapGetters, mapActions } from 'vuex';

export default {
  data() {
    return {
      isPlaying: false,
    }
  },
  props: [
    'index',
    'type',
    'title',
    'artists',
    'album',
    'duration',
    'trackid',
    'image',
    'explicit',
  ],
  created() {
    this.getPlayingState();
  },
  watch: {
    // call again if value changes
    'currentPlayback.item.id': 'getPlayingState',
  },
  methods: {
    ...mapActions(['GET_CURRENT_PLAYBACK', 'SET_PLAYBACK']),

    // check if track is currently playing
    getPlayingState() {
      const self = this,
            isPlayingTrack = (self.currentPlayback.item.id === self.trackid),
            isHistoryView = self.$route.path === '/history';

      if (isPlayingTrack && !isHistoryView) {
        self.isPlaying = true;
      } else {
        self.isPlaying = false;
      }
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
.list {
    display: grid;
    grid-auto-rows: 75px;
    grid-row-gap: 2px;
    .list-item {
        @include font($color: rgba($white, 0.7));
        display: grid;
        align-items: center;
        padding-right: 2em;
        background-color: $grey;
        transition: background-color 0.3s;
        grid-template-columns: 140px minmax(auto, 1fr) minmax(auto, 40px) minmax(auto, 1fr) repeat(2, minmax(auto, 80px));
        grid-template-areas: "index meta labels album duration actions";
        grid-column-gap: 1em;
        @media (max-width: $mobile-breakpoint) {
            grid-template-columns: 75px minmax(auto, 1fr) minmax(auto, 30px) minmax(auto, 1fr) auto;
        }
        &:hover {
            background-color: rgba($white, 0.1);
            cursor: pointer;
            .index-container {
                .image-container {
                    .playback-toggle {
                        @include font($color: $white);
                    }
                    img {
                        filter: brightness(50%);
                    }
                }
            }
        }
        .index-container {
            @include flex($display: flex, $align: center);
            grid-area: index;
            .image-container {
                @include relative;
                width: 75px;
                img {
                    transition: filter 0.3s;
                }
                .playback-toggle {
                    @include absolute($top: 0, $right: 0, $bottom: 0, $left: 0, $z-index: 1);
                    @include flex($display: flex, $justify: center, $align: center);
                    @include font($size: 2.5em, $color: rgba($white, 0));
                    transition: color 0.3s;
                }
            }

            .index,
            .is-playing {
                @include font($size: 1.4em, $weight: 200, $color: $white);
                margin: 0 auto;
            }

            .is-playing {
                @include font($size: 1.7em);
            }
        }

        .meta-container {
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
            grid-area: meta;
            span {
                @include font($size: 1.1em, $color: $white);
            }
            .artist-container {
                overflow: hidden;
                margin-top: 5px;
                text-overflow: ellipsis;
                a {
                    @include comma-separated($size: 1em, $weight: 200);
                }
            }
        }

        .album-container {
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
            grid-area: album;
            a {
                @include comma-separated($size: 1em, $weight: 400);
            }
        }

        .action-container,
        .label-container {
            @include flex($display: flex, $justify: space-between, $align: center);
            i {
                @include item-hover;
            }
        }

        .label-container {
            grid-area: labels;
        }

        .duration {
            grid-area: duration;
        }

        .action-container {
            grid-area: actions;
        }
    }
}
</style>
