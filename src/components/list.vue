<template lang="pug">
li.row(@dblclick='playTrack', :class="{ 'playing': playing }")
	// image
	.image-container(v-if='image')
		i.material-icons(v-if='!playing', @click='playTrack') play_circle_filled
		i.material-icons.playing(v-if='playing') volume_up
		i.material-icons(v-if='playing') pause_circle_filled
		img(:src='image', :alt='title')
	span.index.mobile-hidden(v-if='index != null') {{ formattedIndex }}

	// meta
	.meta-container
		span {{ title }}
		.artist-container(v-if='artists')
			router-link(v-for='artist in artists', :key='artist.id', :to='toArtist(artist.id)') {{ artist.name }}

	// album name
	.album-container(v-if='album')
		router-link(:to='toAlbum(album.id)') {{ album.name }}

	// duration
	span.duration {{ formattedDuration }}

	// actions
	i.material-icons.mobile-hidden(v-tooltip='{ content: $t("addtoplaylist"), container: ".tooltip-container" }') playlist_add
	i.material-icons.mobile-hidden(v-tooltip='{ content: $t("more"), container: ".tooltip-container" }') more_horiz
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
    'primaryid',
    'image',
  ],
  created() {
    // check if currently playing when the view is created
    this.isPlaying();
  },
  watch: {
    // update playing state when playback is changing
    '$store.state.currentPlayback.item.id': 'isPlaying',
  },
  methods: {
    ...mapActions(['GET_CURRENT_PLAYBACK']),
    // to artist
    toArtist(artistid) {
      return `/artist/${artistid}`;
    },

    // to album
    toAlbum(albumid) {
      return `/album/${albumid}`;
    },

    isPlaying() {
      if (this.$store.state.currentPlayback.item.id === this.primaryid) {
        this.playing = true
      } else {
        this.playing = false;
      };
    },

    // play track
    playTrack() {
      this.playing = true;
      this.axios({
        method: 'put',
        url: '/me/player/play',
        data: {
          uris: [`spotify:track:${this.primaryid}`],
        },
      }).then(() => {
        this.GET_CURRENT_PLAYBACK();
      }).catch(() => {
        this.playing = false;
        this.$store.commit('ADD_NOTICE', this.$t('errors.playtrack'));
      });
    },
  },
  computed: {
    // format duration
    formattedDuration() {
      const minutes = Math.floor(this.duration / 60000);
      const seconds = ((this.duration % 60000) / 1000).toFixed(0);
      return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
    },

    // format index
    formattedIndex() {
      if (this.index < 99) {
        return String(`0${this.index + 1}`).slice(-2);
      }
      return (this.index + 1);
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
        box-shadow: $shadow;
        color: rgba($white, 0.7);
        transition: background-color 0.3s, margin 0.3s, box-shadow 0.3s, transform 0.3s;
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
                position: absolute;
                top: 0;
                right: 0;
                bottom: 0;
                left: 0;
                z-index: 1;
                display: flex;
                align-items: center;
                justify-content: center;
                color: rgba($white, 0);
                font-size: 2.5em;
                transition: color 0.3s;
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
            line-height: 1.5em;
            @media screen and (max-width: 955px) {
                padding: 0 15px;
            }
            span {
                color: $white;
                font-size: 1.1em;
            }
            .artist-container {
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
