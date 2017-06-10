<template>
<div class="flex-table">
  <div class="table-row">
    <div class="image">
      <i class="material-icons">play_arrow</i>
      <img class="image" height="100%" src="/static/images/cover4.png" />
    </div>
    <div class="index mobile-hidden">01</div>
    <i class="addtoplaylist mobile-hidden material-icons" v-tooltip="{ content: 'Add to playlist', container: '.tooltip-container' }">playlist_add</i>
    <div class="title">First Time</div>
    <div class="artist"><span>Kygo</span>, <span>Ellie Goulding</span></div>
    <div class="time">3:14</div>
    <div class="actions mobile-hidden">
      <i class="share material-icons" v-tooltip="{ content: 'Share', container: '.tooltip-container' }">share</i>
      <i class="material-icons" v-tooltip="{ content: 'More', container: '.tooltip-container' }">more_horiz</i>
    </div>
  </div>
  <div class="table-row">
    <div class="image">
      <i class="material-icons">play_arrow</i>
      <img class="image" height="100%" src="/static/images/cover2.png" />
    </div>
    <div class="index mobile-hidden">02</div>
    <i class="addtoplaylist mobile-hidden material-icons" v-tooltip="{ content: 'Add to playlist', container: '.tooltip-container' }">playlist_add</i>
    <div class="title">Love Me Like You Do</div>
    <div class="artist"><span>Ellie Goulding</span></div>
    <div class="time">4:13</div>
    <div class="actions mobile-hidden">
      <i class="share material-icons" v-tooltip="{ content: 'Share', container: '.tooltip-container' }">share</i>
      <i class="material-icons" v-tooltip="{ content: 'More', container: '.tooltip-container' }">more_horiz</i>
    </div>
  </div>
  <div class="table-row">
    <div class="image">
      <i class="material-icons">play_arrow</i>
      <img class="image" height="100%" src="/static/images/cover1.png" />
    </div>
    <div class="index mobile-hidden">03</div>
    <i class="addtoplaylist mobile-hidden material-icons" v-tooltip="{ content: 'Add to playlist', container: '.tooltip-container' }">playlist_add</i>
    <div class="title">Burn</div>
    <div class="artist"><span>Ellie Goulding</span></div>
    <div class="time">3:51</div>
    <div class="actions mobile-hidden">
      <i class="share material-icons" v-tooltip="{ content: 'Share', container: '.tooltip-container' }">share</i>
      <i class="material-icons" v-tooltip="{ content: 'More', container: '.tooltip-container' }">more_horiz</i>
    </div>
  </div>
</div>
</template>
<style lang="scss">
.flex-table {
    display: flex;
    flex-direction: column;
    .table-row {
        display: flex;
        align-items: center;
        transition: all 0.3s ease;
        margin: 1px 0;
        background-color: var(--blue);
        &:hover {
            background-color: rgba(255,255,255,0.1);
            .image i {
                opacity: 1;
            }
        }
        .image {
            height: 50px;
            width: 50px;
            position: relative;
            i {
                opacity: 0;
                transition: all 0.3s ease;
                position: absolute;
                top: 0;
                bottom: 0;
                left: 0;
                right: 0;
                z-index: 1;
                font-size: 3em;
            }
        }
        .addtoplaylist {
            width: 5%;
            padding: 0 5px;
        }
        i {
            transition: all 0.3s ease;
            &:hover {
                opacity: 0.7;
                cursor: pointer;
            }
        }
        .index {
            opacity: 0.7;
            width: 5%;
            font-weight: 300;
            text-align: center;
            padding: 0 5px;
        }
        .title {
            width: 40%;
            padding: 0 10px;
        }
        .artist {
            opacity: 0.7;
            width: 30%;
            font-weight: 300;
            padding: 0 10px;
            span {
                &:hover {
                    text-decoration: underline;
                    cursor: pointer;
                }
            }
        }
        .time {
            width: 5%;
            padding: 0 5px;
        }
        .actions {
            width: 15%;
            display: flex;
            justify-content: space-around;
            padding: 0 5px;
        }
    }
}
</style>
