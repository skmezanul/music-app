<template lang="pug">
li.row(
  @dblclick='playTrack',
  :class="{ 'playing': playing }")

  // image
  .image-container(v-if='image')
    i.material-icons(
      v-if='!playing',
      @click='playTrack') play_circle_filled

    i.material-icons.playing(v-if='playing') volume_up
    i.material-icons(v-if='playing') pause_circle_filled
    img(
      :src='image',
      :alt='title')

  span.index.mobile-hidden {{ formattedIndex }}

  // meta
  .meta-container
    span {{ title }}
    .artist-container(v-if='artists')
      router-link(
        v-for='artist in artists',
        :key='artist.id',
        :to='toTarget(artist.type, artist.id)') {{ artist.name }}

  .explicit
    span(
      v-if='explicit',
      v-tooltip='{ content: $t("explicit") }') E

  // album name
  .album-container(v-if='album')
    router-link(:to='toTarget(album.type, album.id)') {{ album.name }}

  // duration
  span.duration {{ formattedDuration }}

  // actions
  i.material-icons.mobile-hidden(
    v-tooltip='{ content: $t("addtoplaylist") }') playlist_add

  i.material-icons.mobile-hidden(
    v-tooltip='{ content: $t("more") }') more_horiz
</template>

<script>
import {
  mapActions
} from 'vuex';

export default {
  data() {
    return {
      playing: false,
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
  methods: {
    ...mapActions(['GET_CURRENT_PLAYBACK']),

    // to target
    toTarget(name, id) {
      const target = {
        name,
        params: {
          id,
        },
      };
      return target;
    },

    // play track
    playTrack() {
      const that = this;

      that.playing = true;
      that.axios({
        method: 'put',
        url: '/me/player/play',
        data: {
          uris: [`spotify:track:${that.trackid}`],
        },
      }).then(() => {
        that.GET_CURRENT_PLAYBACK();
      });
    },
  },
  computed: {
    // format duration
    formattedDuration() {
      const that = this;
      const minutes = Math.floor(that.duration / 60000);
      const seconds = ((that.duration % 60000) / 1000).toFixed(0);
      return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
    },

    // format index
    formattedIndex() {
      const that = this;
      if (that.index < 99) {
        return String(`0${that.index + 1}`).slice(-2);
      }
      return (that.index + 1);
    },
  },
};
</script>

<style lang="scss">
.list {
    .row {
        display: flex;
        align-items: center;
        margin-bottom: 2px;
        height: 75px;
        background-color: $blue;
        color: rgba($white, 0.7);
        transition: background-color 0.3s, margin 0.3s, transform 0.3s;
        > i {
            margin-right: 25px;
            transition: color 0.3s;
            &:hover {
                color: $white;
            }
        }
        &:hover {
            background-color: rgba($white, 0.1);
            cursor: pointer;
            .image-container {
                i {
                    color: $white;
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
                    color: $white;
                }
            }
        }
        .image-container {
            position: relative;
            overflow: hidden;
            width: 75px;
            height: 75px;
            img {
                width: auto;
                height: 100%;
                transition: filter 0.3s;
            }
            i {
                @include position(absolute, 1);
                @include flex-center;
                color: rgba($white, 0);
                font-size: 2.5em;
                transition: color 0.3s;
            }
        }
        .explicit {
          flex: 0.15;
          span {
            @include flex-center;
            padding-top: 2px;
            padding-left: 1px;
            width: 18px;
            height: 18px;
            border-radius: 5px;
            background-color: rgba($white, 0.7);
            color: $blue;
          }
        }
        .index {
            margin: 0 20px;
            color: $white;
            text-align: center;
            font-weight: 300;
            font-size: 1.4em;
        }
        .meta-container {
            flex: 1.5;
            overflow: hidden;
            margin-right: 20px;
            text-overflow: ellipsis;
            white-space: nowrap;
            @media screen and (max-width: $breakpoint-mobile) {
                padding: 0 15px;
            }
            span {
                color: $white;
                font-size: 1.1em;
            }
            .artist-container {
                margin-top: 5px;
                a {
                    @include comma-separated(1em, 300);
                }
            }
        }
        .album-container {
            flex: 1;
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
            a {
                @include comma-separated(1em, 400);
            }
        }
        .duration {
            flex: 0.5;
            text-align: center;
        }
    }
}
</style>
