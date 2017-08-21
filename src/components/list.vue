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
			router-link(v-for='artist in artists', :key='artist.id', :to='`/artist/${artist.id}`') {{ artist.name }}

	// album name
	.album(v-if='album')
		router-link(:to='`/${album.type}/${album.id}`') {{ album.name }}

	// duration
	span.duration {{ formattedDuration }}

	// actions
	i.material-icons(v-tooltip='{ content: $t("addtoplaylist"), container: ".tooltip-container" }') playlist_add
	i.material-icons(v-tooltip='{ content: $t("more"), container: ".tooltip-container" }') more_horiz
</template>

<script>
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
    '$store.state.currentPlayback.item.id': 'isPlaying',
  },
  methods: {
    // play track (WIP)
    playTrack() {
      this.axios({
        method: 'put',
        url: '/me/player/play',
        data: {
          context_uri: 'spotify:user:spotify:playlist:37i9dQZF1DWUW2bvSkjcJ6',
        },
      }).catch(() => {
        this.$store.commit('notice', 'Track could not be played, please try again later.');
      });
    },

    // check if track is playing
    isPlaying() {
      if (this.$store.state.currentPlayback.item.id === this.primaryid) {
        this.playing = true;
      };
    },
  },
  computed: {
    formattedDuration() {
      const minutes = Math.floor(this.duration / 60000);
      const seconds = ((this.duration % 60000) / 1000).toFixed(0);
      return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
    },
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
        height: 65px;
        background-color: $blue;
        box-shadow: $shadow;
        transition: background-color 0.3s, margin 0.3s, box-shadow 0.3s, transform 0.3s;
        &.playing {
            margin: 10px 0;
            background-color: $dark-blue;
            box-shadow: $shadow-highlight;
            transform: scale(1.02);
            .image-container {
                img {
                    filter: brightness(20%);
                }
                i.playing {
                    opacity: 1;
                }
            }
        }
        .image-container {
            position: relative;
            overflow: hidden;
            width: 65px;
            height: 65px;
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
                font-size: 2.5em;
                opacity: 0;
            }
        }
        &:hover {
            background-color: rgba($white, 0.1);
            cursor: pointer;
            .image-container {
                i {
                    opacity: 1;
                    &.playing {
                        opacity: 0;
                    }
                }
                img {
                    filter: brightness(50%);
                }
            }
        }
        i {
            flex: 0.13;
            transition: color 0.3s, opacity 0.3s;
            @media screen and (max-width: 955px) {
                padding: 0 15px;
            }
            &:hover {
                color: rgba($white, 0.7);
                cursor: pointer;
            }
        }
        .index {
            margin: 0 20px;
            text-align: center;
            font-weight: 300;
            font-size: 1.3em;
        }
        .meta-container {
            flex: 1.5;
            overflow: hidden;
            margin-right: 20px;
            text-overflow: ellipsis;
            white-space: nowrap;
            line-height: 1.3em;
            @media screen and (max-width: 955px) {
                padding: 0 15px;
            }
            .artist-container {
                a {
                    @include comma-separated(1em, 300);
                }
            }
        }
        .duration {
            flex: 0.5;
            text-align: center;
        }
        .album {
            flex: 1;
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
            a {
                @include comma-separated(1em, 300);
            }
        }
    }
}
</style>
