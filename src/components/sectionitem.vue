<template>
<div class="section-item">
  <div class="section-item-inner">
    <div class="item-overlay">
      <div class="overlay-actions">
        <i class="favorite material-icons">favorite</i>
        <i v-if="playing == false" @click="playing = true" class="play material-icons">play_circle_outline</i>
        <i v-if="playing == true" @click="playing = false" class="play material-icons">pause_circle_outline</i>
        <i class="more material-icons">more_horiz</i>
      </div>
    </div>
    <img src="/static/images/cover4.png" alt="First Time" class="item-image" />
    <div class="item-description">
      <h4 class="item-title">{{title}}</h4>
      <div class="item-subtitle"><a>{{subtitle}}</a></div>
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
    width: 20%;
    @media screen and (max-width: 955px) {
        width: 100%;
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
        .item-overlay {
            display: flex;
            position: absolute;
            top: 0;
            right: 0;
            bottom: 0;
            left: 0;
            justify-content: center;
            background: linear-gradient(to top, var(--accent-color) 25%, rgba(45, 54, 76, 0.5));
            content: "";
            opacity: 0;
            transition: all 0.3s ease;
            z-index: 1;
            .overlay-actions {
                display: flex;
                align-items: center;
                justify-content: space-around;
                width: 90%;
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
        .item-image {
            width: 100%;
            height: auto;
        }
        &:hover {
            .item-overlay {
                opacity: 1;
            }
        }
        .item-description {
            display: flex;
            flex-direction: column;
            align-items: center;
            padding: 10px;
            line-height: 1.4em;
            text-align: center;
            .item-title {
                z-index: 2;
            }
            .item-subtitle {
                font-size: 0.85em;
                opacity: 0.7;
                z-index: 2;
                font-weight: 300;
                &:hover {
                    cursor: pointer;
                    text-decoration: underline;
                }
            }
        }
    }
}
</style>
