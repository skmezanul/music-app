<template>
<li class="table-row" @dblclick="playTrack" :class="{ 'playing': playing }">
  <div v-if="image != null" class="image-container">
    <i v-if="playing === false" @click="playTrack" class="material-icons">play_circle_filled</i>
    <i v-if="playing === true" class="material-icons playing">volume_up</i>
    <i v-if="playing === true" class="material-icons">pause_circle_filled</i>
    <img :src="image" :alt="title" />
  </div>
  <span v-if="index != null" class="index mobile-hidden">{{ formattedIndex }}</span>
  <div class="meta-container">
    <span>{{title}}</span>
    <div v-if="artists != null" class="artist-container">
      <router-link v-for="artist in artists" :key="artist.id" :to="`/${artist.type}/${artist.id}`">{{ artist.name }}</router-link>
    </div>
  </div>
  <div v-if="album != null" class="album">
    <router-link :to="`/${album.type}/${album.id}`">{{ album.name }}</router-link>
  </div>
  <span class="duration">{{ formattedDuration }}</span>
  <i class="material-icons" v-tooltip="{ content: 'Add to playlist', container: '.tooltip-container' }">playlist_add</i>
  <i class="material-icons" v-tooltip="{ content: 'More', container: '.tooltip-container' }">more_horiz</i>
</li>
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
    'primaryID',
    'image',
  ],
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
      if (this.$store.state.currentPlayback.item.id === this.primaryID) {
        console.log('true');
      }
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
.flex-table {
    .table-row {
        display: flex;
        align-items: center;
        transition: background-color 0.3s, margin 0.3s, box-shadow 0.3s, transform 0.3s;
        margin-bottom: 2px;
        background-color: $blue;
        height: 65px;
        box-shadow: $shadow;
        &.playing {
            background-color: $dark-blue;
            margin: 10px 0;
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
            height: 65px;
            width: 65px;
            position: relative;
            overflow: hidden;
            img {
                transition: filter 0.3s;
                height: 100%;
                width: auto;
            }
            i {
                display: flex;
                justify-content: center;
                align-items: center;
                font-size: 2.5em;
                opacity: 0;
                position: absolute;
                top: 0;
                bottom: 0;
                left: 0;
                right: 0;
                z-index: 1;
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
            transition: color 0.3s, opacity 0.3s;
            flex: 0.13;
            @media screen and (max-width: 955px) {
                padding: 0 15px;
            }
            &:hover {
                color: rgba($white, 0.7);
                cursor: pointer;
            }
        }
        .index {
            font-weight: 300;
            text-align: center;
            margin: 0 20px;
            font-size: 1.3em;
        }
        .meta-container {
            flex: 1.5;
            line-height: 1.3em;
            margin-right: 20px;
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;
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
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;
            a {
                @include comma-separated(1em, 300);
            }
        }
    }
}
</style>
