<template>
<div class="card date">
  <img :src="image" :alt="venue" width="100%" height="auto" />
  <div class="card-overlay">
    <div class="container left">
      <h1>{{month}}</h1>
      <h1>{{day}}</h1>
    </div>
    <div class="container right">
      <h2><span>{{city}}</span><span>{{country}}</span></h2>
      <h1>{{venue}}</h1>
      <div class="button-container">
        <a class="btn"><i class="material-icons">event_available</i>Buy Tickets</a>
        <a class="btn btn-transparent"><i class="material-icons">share</i>Share</a>
      </div>
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
.card {
    position: relative;
    margin-bottom: 10px;
    overflow: hidden;
    &.date {
        height: 250px;
        width: 100%;
        img {
            filter: contrast(150%);
        }
        .card-overlay {
            position: absolute;
            top: 0;
            left: 0;
            bottom: 0;
            right: 0;
            display: flex;
            &:before {
                content: "";
                background: var(--dark-blue-transparent);
                position: absolute;
                top: 0;
                left: 0;
                bottom: 0;
                right: 0;
            }
            .container {
                display: flex;
                flex-direction: column;
                padding: 30px;
                box-sizing: border-box;
                z-index: 1;
                &.left {
                    align-items: center;
                    justify-content: center;
                    flex: 1;
                    text-align: center;
                    text-transform: uppercase;
                    background: var(--blue);
                    h1 {
                        font-size: 2.5em;
                        line-height: 1em;
                        &:last-of-type {
                            font-size: 5em;
                        }
                    }
                }
                &.right {
                    flex: 4;
                    h1 {
                        font-size: 3.5em;
                        margin-left: -4px;
                    }
                    .button-container {
                        margin-top: auto;
                        a {
                            margin: 0;
                        }
                    }
                }
            }
        }
    }
}
</style>
