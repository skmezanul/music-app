<template>
<li class="table-row" @dblclick="playTrack(title, subtitle)" :class="{ 'playing': playing }">
  <div v-if="image != null" class="image-container">
    <i v-show="playing === false" class="material-icons">play_circle_filled</i>
    <i v-show="playing === true" class="material-icons playing">volume_up</i>
    <i v-show="playing === true" class="material-icons">pause_circle_filled</i>
    <img :src="image" :alt="title" />
  </div>
  <span class="index mobile-hidden">{{String("0" + (index+1)).slice(-2)}}</span>
  <div class="meta-container">
    <span>{{title}}</span>
    <div v-if="artistID != null" class="artist">
      <router-link :to="'/artist/'+artistID">{{ artist }}</router-link>
    </div>
  </div>
  <div v-if="albumID != null" class="album">
    <router-link :to="'/album/'+albumID">{{ album }}</router-link>
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
    }
  },
  props: [
    'index',
    'type',
    'title',
    'artist',
    'artistID',
    'album',
    'albumID',
    'duration',
    'image'
  ],
  methods: {
    playTrack: function(title, artist) {
      this.playing = !this.playing
    }
  },
  computed: {
    formattedDuration() {
      const minutes = Math.floor(this.duration / 60000);
      const seconds = ((this.duration % 60000) / 1000).toFixed(0);
      return minutes + ":" + (seconds < 10 ? '0' : '') + seconds;
    }
  }
}
</script>

<style lang="scss">
.flex-table {
    box-shadow: $shadow;
    .table-row {
        display: flex;
        align-items: center;
        transition: background-color 0.3s, margin 0.3s, box-shadow 0.3s, transform 0.3s;
        margin: 2px 0;
        background-color: $blue;
        height: 60px;
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
            height: 60px;
            width: 60px;
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
            flex: 0.2;
            font-weight: 300;
            text-align: center;
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
            .artist {
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
