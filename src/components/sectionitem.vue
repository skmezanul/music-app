<template>
<div class="section-item" :class="type">
  <div class="section-item-inner">
    <div class="item-overlay">
      <div class="overlay-actions">
        <i class="favorite material-icons">favorite</i>
        <i v-if="playing == false" @click="playing = true" class="play material-icons">play_circle_outline</i>
        <i v-if="playing == true" @click="playing = false" class="play material-icons">pause_circle_outline</i>
        <i class="more material-icons">more_horiz</i>
      </div>
    </div>
    <img :src="image" :alt="title" />
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
    flex-basis: 25%;
    max-width: 25%;
    &.stage {
        .section-item-inner {
            .item-description {
                position: absolute;
                bottom: 0;
                top: 0;
                left: 0;
                right: 0;
                box-sizing: border-box;
                justify-content: flex-end;
                background: linear-gradient(to top, rgba(0,0,0,0.7) 0%, rgba(45, 54, 76, 0));
                padding-bottom: 25px;
                .item-description-inner {
                    font-size: 1.3em;
                    line-height: 1.2em;
                }
            }
            img {
                filter: brightness(70%) contrast(105%);
            }
        }
    }
    @media screen and (max-width: 955px) {
        flex-basis: 50%;
        max-width: 50%;
    }
    .section-item-inner {
        display: flex;
        position: relative;
        flex-direction: column;
        background-color: var(--blue);
        transition: all 0.3s ease;
        height: 100%;
        overflow: hidden;
        @media screen and (min-width: 955px) {
            &:hover {
                transform: scale(1.05);
                box-shadow: 0 10px 20px var(--shadow-color);
            }
        }
        img {
            width: 100%;
            height: auto;
        }
        .item-overlay {
            display: flex;
            position: absolute;
            top: 0;
            right: 0;
            bottom: 0;
            left: 0;
            justify-content: center;
            background: linear-gradient(to top, var(--accent-color) 25%, rgba(45, 54, 76, 0.5));
            opacity: 0;
            transition: all 0.3s ease;
            z-index: 1;
            .overlay-actions {
                display: flex;
                align-items: center;
                justify-content: space-around;
                flex: 0.8;
                i {
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
            flex-direction: column;
            justify-content: center;
            padding: 10px;
            line-height: 1.4em;
            text-align: center;
            height: 100%;
            .item-description-inner {
                z-index: 2;
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
