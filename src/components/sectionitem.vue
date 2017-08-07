<template>
<div class="section-item" :class="type">
  <div class="section-item-inner" @click="toTarget(type, primaryID, secondaryID)">
    <div class="item-overlay" v-if="type != 'artist'">
      <div class="overlay-actions">
        <i class="favorite material-icons">favorite</i>
        <i v-if="playing === false" @click="playing = true" class="play material-icons">play_circle_filled</i>
        <i v-if="playing === true" @click="playing = false" class="play material-icons">pause_circle_filled</i>
        <i class="more material-icons">more_horiz</i>
      </div>
    </div>
    <div class="image-container">
      <img :src="image" :alt="title" />
    </div>
    <div class="meta-container">
      <div class="meta-container-inner">
        <span>{{ title }}</span>
        <div v-if="artist != null" class="artist-container">
          <a class="artist" v-for="item in artist" @click="toArtist(item.type, item.id)">{{ item.name }}</a>
        </div>
      </div>
    </div>
  </div>
</div>
</template>

<script>
export default {
  data() {
    return {
      playing: false,
    };
  },
  props: [
    'type',
    'primaryID',
    'secondaryID',
    'title',
    'artist',
    'image',
  ],
  methods: {
    toTarget(type, primaryID, secondaryID) {
      if (type === 'playlist') {
        this.$router.push({
          path: `/${type}/${secondaryID}/${primaryID}`,
        });
      } else {
        this.$router.push({
          path: `/${type}/${primaryID}`,
        });
      }
    },
    toArtist(type, artistID) {
      this.$router.push({
        path: `/${type}/${artistID}`,
      });
    },
  },
};
</script>

<style lang="scss">
.section-item {
    padding: 7px;
    box-sizing: border-box;
    flex: 1;
    flex-basis: 20%;
    max-width: 20%;
    @media screen and (max-width: 955px) {
        flex-basis: 50% !important;
        max-width: 50% !important;
    }
    &.artist {
        flex-basis: 25%;
        max-width: 25%;
        .section-item-inner {
            height: 300px;
            .meta-container {
                position: absolute;
                bottom: 0;
                top: 0;
                left: 0;
                right: 0;
                box-sizing: border-box;
                justify-content: center;
                align-items: flex-end;
                background: linear-gradient(to top, rgba($black,0.7), rgba($black,0));
                padding-bottom: 40px;
                height: 100%;
                .meta-container-inner {
                    font-size: 1.3em;
                }
            }
            .image-container {
                img {
                    transition: transform 0.7s, filter 0.3s;
                    will-change: transform;
                    filter: brightness(70%) contrast(110%);
                    height: 100%;
                    width: auto;
                }
            }
            &:hover {
                .image-container {
                    img {
                        filter: brightness(100%) contrast(100%);
                        transform: scale(1.07);
                    }
                }
            }
        }
    }
    &.playlist {
        .section-item-inner {
            .meta-container {
                padding: 20px 15px;
            }
        }
    }
    .section-item-inner {
        display: flex;
        justify-content: space-between;
        flex-direction: column;
        position: relative;
        background-color: $blue;
        height: 100%;
        overflow: hidden;
        transition: box-shadow 0.3s;
        box-shadow: $shadow;
        &:hover {
            box-shadow: $shadow-highlight;
            cursor: pointer;
            .item-overlay {
                opacity: 1;
            }
        }
        .image-container {
            display: flex;
            justify-content: center;
            align-items: center;
            width: 100%;
            height: auto;
            overflow: hidden;
            img {
                width: 100%;
                height: auto;
            }
        }
        .item-overlay {
            display: flex;
            position: absolute;
            top: 0;
            right: 0;
            bottom: 0;
            left: 0;
            justify-content: center;
            background: linear-gradient(to top, $accent-color 25%, rgba($blue,0.5));
            opacity: 0;
            transition: opacity 0.3s;
            z-index: 1;
            .overlay-actions {
                display: flex;
                align-items: center;
                justify-content: space-around;
                flex: 0.8;
                i {
                    transition: color 0.3s;
                    &:not(.play):hover {
                        cursor: pointer;
                        color: rgba($white, 0.7);
                    }
                    &.play {
                        font-size: 4.5em;
                        transition: transform 0.3s;
                        &:hover {
                            transform: scale(1.1);
                        }
                    }
                }
            }
        }
        .meta-container {
            display: flex;
            justify-content: center;
            padding: 15px;
            .meta-container-inner {
                z-index: 2;
                overflow: hidden;
                white-space: nowrap;
                text-align: center;
                text-overflow: ellipsis;
                line-height: 1.4em;
                .artist-container {
                    a {
                        @include comma-separated(0.95em, 300);
                    }
                }

            }
        }
    }
}
</style>
