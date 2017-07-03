<template>
<div class="section-item" :class="type">
  <div class="section-item-inner">
    <div class="item-overlay" v-if="type == null">
      <div class="overlay-actions">
        <i class="favorite material-icons">favorite</i>
        <i v-if="playing == false" @click="playing = true" class="play material-icons">play_circle_outline</i>
        <i v-if="playing == true" @click="playing = false" class="play material-icons">pause_circle_outline</i>
        <i class="more material-icons">more_horiz</i>
      </div>
    </div>
    <div class="image-container">
      <img :src="image" :alt="title" />
    </div>
    <div class="item-description">
      <div class="item-description-inner">
        <h4 class="item-title">{{title}}</h4>
        <div class="item-subtitle"><a>{{subtitle}}</a></div>
      </div>
    </div>
  </div>
</div>
</template>

<script>
export default {
  data() {
    return {
      playing: false
    }
  },
  props: [
    'type',
    'title',
    'subtitle',
    'image'
  ]
}
</script>

<style lang="scss">
.section-item {
    padding: 5px;
    box-sizing: border-box;
    flex: 1;
    flex-basis: 20%;
    max-width: 20%;
    @media screen and (max-width: 955px) {
        flex-basis: 50%;
        max-width: 50%;
    }
    &.stage {
        flex-basis: 25%;
        max-width: 25%;
        .section-item-inner {
            .item-description {
                position: absolute;
                bottom: 0;
                top: 0;
                left: 0;
                right: 0;
                box-sizing: border-box;
                justify-content: center;
                align-items: flex-end;
                background: linear-gradient(to top, rgba($black,0.7), rgba($black,0));
                padding-bottom: 25px;
                height: 100%;
                .item-description-inner {
                    font-size: 1.3em;
                    line-height: 1.2em;
                }
            }
            .image-container {
              height: 350px;
              img {
                  filter: brightness(70%) contrast(105%);
                  transition: transform 0.3s;
                  height: 100%;
                  width: auto;
              }
            }
            &:hover {
                cursor: pointer;
                img {
                    transform: scale(1.1);
                }
            }
        }
    }
    .section-item-inner {
        display: flex;
        position: relative;
        flex-direction: column;
        background-color: $blue;
        height: 100%;
        overflow: hidden;
        transition: box-shadow 0.3s;
        box-shadow: $shadow;
        .image-container {
          display: flex;
          justify-content: center;
          align-items: center;
          width: 100%;
          height: auto;
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
                    transition: opacity 0.3s;
                    &:hover {
                        cursor: pointer;
                        opacity: 0.7;
                    }
                    &.play {
                        font-size: 4.5em;
                    }
                }
            }
        }
        .item-description {
            display: flex;
            justify-content: center;
            padding: 15px;
            .item-description-inner {
                z-index: 2;
                overflow: hidden;
                white-space: nowrap;
                text-align: center;
                line-height: 1.4em;
                .item-subtitle {
                    font-size: 0.85em;
                    opacity: 0.7;
                    font-weight: 300;
                    &:hover {
                        cursor: pointer;
                        text-decoration: underline;
                    }
                }

            }
        }
    }
    &:hover {
        .item-overlay {
            opacity: 1;
        }
    }
}
</style>
