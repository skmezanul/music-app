<template>
<div class="event-card">
  <div class="container left">
    <h1>{{month}}</h1>
    <h1>{{day}}</h1>
  </div>
  <div class="container right">
    <div class="right-inner">
      <div class="location"><a>{{city}}</a><a>{{country}}</a></div>
      <h1>{{venue}}</h1>
      <div class="button-container">
        <a class="btn"><i class="material-icons">event_available</i>Buy Tickets</a>
        <a class="btn btn-transparent"><i class="material-icons">share</i>Share</a>
      </div>
    </div>
    <div class="image-container">
      <img :src="image" :alt="venue" />
    </div>
  </div>
</div>
</template>

<script>
export default {
  props: [
    'month',
    'day',
    'city',
    'country',
    'venue',
    'image'
  ]
}
</script>

<style lang="scss">
.event-card {
    margin-bottom: 14px;
    box-shadow: $shadow;
    display: flex;
    height: 250px;
    .container {
        display: flex;
        flex-direction: column;
        padding: 30px;
        &.left {
            flex: 1;
            align-items: center;
            justify-content: center;
            text-transform: uppercase;
            background: $blue;
            h1 {
                font-size: 2.5em;
                line-height: 1em;
                &:last-of-type {
                    font-size: 5em;
                }
            }
        }
        &.right {
            flex: 5;
            position: relative;
            .right-inner {
                z-index: 1;
                display: flex;
                flex-direction: column;
                justify-content: space-between;
                height: 100%;
                h1 {
                    font-size: 4em;
                    margin-left: -4px;
                }
                .location {
                  a {
                      text-transform: uppercase;
                      @include comma-separated(1.2em, 400);
                  }
                }
                .button-container {
                    margin-top: auto;
                    a {
                        margin: 0;
                    }
                }
            }
            .image-container {
                position: absolute;
                top: 0;
                left: 0;
                right: 0;
                bottom: 0;
                overflow: hidden;
                display: flex;
                align-items: center;
                img {
                    filter: brightness(40%) saturate(150%);
                    width: 100%;
                    height: auto;
                }
            }
        }
    }
}
</style>
