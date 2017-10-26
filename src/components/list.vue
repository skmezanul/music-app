<template lang="pug">
li.row(
  @dblclick='SET_PLAYBACK({ state: "play", trackid })',
  :class='{ "playing" : isPlaying }')

  // image
  .image-container(v-if='image')
    i.material-icons(
      v-if='!isPlaying',
      @click='SET_PLAYBACK({ state: "play", trackid })') play_circle_filled

    i.material-icons.playing(v-if='isPlaying') volume_up
    i.material-icons(
      v-if='isPlaying',
      @click='SET_PLAYBACK({ state: "pause" })') pause_circle_filled
    img(
      :src='image',
      :alt='title')

  span.index(v-if='!$mq.phone') {{ $formatValue(index, 'index') }}

  // meta
  .meta-container
    span {{ title }}
    .artist-container(v-if='artists')
      router-link(
        v-for='artist in artists',
        :key='artist.id',
        :to='$toRoute("artist", { id: artist.id })') {{ artist.name }}
  .label-container
    i.material-icons(
      v-if='explicit',
      v-tooltip='{ content: $t("explicit") }') explicit

  // album name
  .album-container(v-if='album')
    router-link(:to='$toRoute("album", { id: album.id })') {{ album.name }}

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
    };
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
      const that = this,
            isPlayingTrack = (that.currentPlayback.item.id === that.trackid),
            isHistoryView = that.$includes(that.$route.name, 'history');

      if (isPlayingTrack && !isHistoryView) {
        that.isPlaying = true;
      } else {
        that.isPlaying = false;
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
    .row {
        @include flex($display: flex, $align: center);
        @include font($color: rgba($white, 0.7));
        margin-bottom: 2px;
        height: 75px;
        background-color: $blue;
        transition: all 0.3s;
        &:hover {
            background-color: rgba($white, 0.1);
            cursor: pointer;
            .image-container {
                i {
                    @include font($color: $white);
                    &.playing {
                        visibility: hidden;
                    }
                }
                img {
                    filter: brightness(50%);
                }
            }
        }
        &.playing {
            margin: 10px 0;
            transform: scale(1.02);
            .image-container {
                img {
                    filter: brightness(20%);
                }
                i.playing {
                    @include font($color: $white);
                }
            }
        }
        .image-container {
            @include relative;
            overflow: hidden;
            width: 75px;
            height: 75px;
            img {
                width: auto;
                height: 100%;
                transition: filter 0.3s;
            }
            i {
                @include absolute($top: 0, $right: 0, $bottom: 0, $left: 0, $z-index: 1);
                @include flex($display: flex, $justify: center, $align: center);
                @include font($size: 2.5em, $color: rgba($white, 0));
                transition: color 0.3s;
            }
        }
        .index {
            @include font($size: 1.4em, $weight: 300, $color: $white);
            padding-left: 20px;
            text-align: center;
        }
        .meta-container {
            @include flex($flex: 1.3);
            overflow: hidden;
            padding: 0 20px;
            text-overflow: ellipsis;
            white-space: nowrap;
            @media (max-width: $breakpoint-mobile) {
                padding: 0 15px;
            }
            span {
                @include font($size: 1.1em, $color: $white);
            }
            .artist-container {
                overflow: hidden;
                margin-top: 5px;
                text-overflow: ellipsis;
                a {
                    @include comma-separated($size: 1em, $weight: 300);
                }
            }
        }

        .album-container {
            @include flex($flex: 1);
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
            a {
                @include comma-separated($size: 1em, $weight: 400);
            }
        }

        .duration {
            @include flex($flex: 0.3);
            padding-right: 10px;
            text-align: center;
        }

        .label-container, .action-container  {
          @include flex($display: flex, $align: center, $flex: 0.3);
          padding: 0 30px;
          i {
              @include item-hover;
          }
        }

        .action-container  {
          @include flex($justify: space-between);
          max-width: 140px;
        }

        .label-container  {
          @include flex($justify: center);
          max-width: 100px;
        }
    }
}
</style>
