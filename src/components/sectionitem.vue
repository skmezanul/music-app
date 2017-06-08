<template>
<div class="section-item">
  <div class="item-overlay">
    <div class="overlay-actions">
      <i class="favorite material-icons">favorite</i>
      <i class="play material-icons">play_circle_outline</i>
      <i class="more material-icons">more_horiz</i>
    </div>
  </div>
  <img src="/static/images/cover4.png" class="item-image">
  <div class="item-description">
    <div class="item-title">{{title}}</div>
    <div class="item-subtitle">{{subtitle}}</div>
  </div>
</div>
</template>

<script>
export default {
  props: [
    'title',
    'subtitle',
    'image'
  ]
}
</script>

<style lang="scss">
.section-item {
    display: flex;
    position: relative;
    flex-direction: column;
    width: 20%;
    margin: 5px;
    background-color: var(--blue);
    transition: all 0.3s ease;
    &:hover {
        transform: scale(1.05);
        box-shadow: 0 10px 20px var(--shadow-color);
    }
    .item-overlay {
        display: flex;
        position: absolute;
        top: 0;
        right: 0;
        bottom: 0;
        left: 0;
        justify-content: center;
        background: linear-gradient(to top, var(--accent-color) 30%, rgba(45, 54, 76, 0.5));
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
    &:hover .item-overlay {
        opacity: 1;
    }
    .item-image {
        width: 100%;
        height: auto;
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
</style>
