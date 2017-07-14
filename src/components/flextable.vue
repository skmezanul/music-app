<template>
<ol class="flex-table">
  <li class="table-row" @click="playTrack(title, subtitle)">
    <div class="image-container">
      <i class="material-icons">play_arrow</i>
      <img :src="image" :alt="title" />
    </div>
    <span class="index mobile-hidden">{{String("0" + (index+1)).slice(-2)}}</span>
    <div class="meta-container">
      <span class="item-title">{{title}}</span>
      <div class="item-subtitle"><router-link :to="toArtist">{{subtitle}}</router-link></div>
    </div>
    <span class="item-duration">{{duration}}</span>
    <i class="material-icons" v-tooltip="{ content: 'Add to playlist', container: '.tooltip-container' }">playlist_add</i>
    <i class="material-icons" v-tooltip="{ content: 'More', container: '.tooltip-container' }">more_horiz</i>
  </li>
</ol>
</template>

<script>
export default {
  props: [
    'title',
    'subtitle',
    'duration',
    'image',
    'index'
  ],
  methods: {
    playTrack: function(title, artist) {
      console.log('Playing "'+title+'" by '+artist+'.')
    }
  },
  computed: {
    toArtist() {
      return `/artist/${this.subtitle}`
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
        transition: background-color 0.3s;
        margin: 2px 0;
        background-color: $blue;
        .image-container {
            height: 60px;
            width: 60px;
            position: relative;
            img {
                transition: filter 0.3s;
                height: 100%;
                width: auto;
            }
            i {
                opacity: 0;
                position: absolute;
                top: 0;
                bottom: 0;
                left: 0;
                right: 0;
                z-index: 1;
                font-size: 3.8em;
            }
        }
        &:hover {
            background-color: rgba($white, 0.1);
            .image-container {
                i {
                    opacity: 1;
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
            flex: 2;
            line-height: 1.3em;
            @media screen and (max-width: 955px) {
                padding: 0 15px;
            }
            .item-subtitle {
                a {
                    @include comma-separated(1em, 300);
                }
            }
        }
        .item-duration {
            flex: 0.5;
            text-align: center;
        }
    }
}
</style>
