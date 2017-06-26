<template>
<ol class="flex-table">
  <li class="table-row">
    <div class="image">
      <i class="material-icons">play_arrow</i>
      <img src="/static/images/cover4.png" alt="First Time" height="100%" />
    </div>
    <div class="index mobile-hidden">01</div>
    <i class="addtoplaylist mobile-hidden material-icons" v-tooltip="{ content: 'Add to playlist', container: '.tooltip-container' }">playlist_add</i>
    <div class="title">First Time</div>
    <div class="artist"><a>Kygo</a><a>Ellie Goulding</a></div>
    <div class="time">3:14</div>
    <div class="actions mobile-hidden">
      <i class="share material-icons" v-tooltip="{ content: 'Share', container: '.tooltip-container' }">share</i>
      <i class="material-icons" v-tooltip="{ content: 'More', container: '.tooltip-container' }">more_horiz</i>
    </div>
  </li>
  <li class="table-row">
    <div class="image">
      <i class="material-icons">play_arrow</i>
      <img src="/static/images/cover2.png" alt="Love Me Like You Do" height="100%" />
    </div>
    <div class="index mobile-hidden">02</div>
    <i class="addtoplaylist mobile-hidden material-icons" v-tooltip="{ content: 'Add to playlist', container: '.tooltip-container' }">playlist_add</i>
    <div class="title">Love Me Like You Do</div>
    <div class="artist"><a>Ellie Goulding</a></div>
    <div class="time">4:13</div>
    <div class="actions mobile-hidden">
      <i class="share material-icons" v-tooltip="{ content: 'Share', container: '.tooltip-container' }">share</i>
      <i class="material-icons" v-tooltip="{ content: 'More', container: '.tooltip-container' }">more_horiz</i>
    </div>
  </li>
  <li class="table-row">
    <div class="image">
      <i class="material-icons">play_arrow</i>
      <img src="/static/images/cover1.png" alt="Burn" height="100%" />
    </div>
    <div class="index mobile-hidden">03</div>
    <i class="addtoplaylist mobile-hidden material-icons" v-tooltip="{ content: 'Add to playlist', container: '.tooltip-container' }">playlist_add</i>
    <div class="title">Burn</div>
    <div class="artist"><a>Ellie Goulding</a></div>
    <div class="time">3:51</div>
    <div class="actions mobile-hidden">
      <i class="share material-icons" v-tooltip="{ content: 'Share', container: '.tooltip-container' }">share</i>
      <i class="material-icons" v-tooltip="{ content: 'More', container: '.tooltip-container' }">more_horiz</i>
    </div>
  </li>
</ol>
</template>
<style lang="scss">
.flex-table {
    .table-row {
        display: flex;
        align-items: center;
        transition: all 0.3s ease;
        margin: 2px 0;
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
                background-color: rgba(0,0,0,0.7);
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
        i {
            transition: all 0.3s ease;
            &:hover {
                opacity: 0.7;
                cursor: pointer;
            }
        }
        .index {
            flex: 0.3;
            opacity: 0.7;
            font-weight: 300;
            text-align: center;
            padding: 0 5px;
        }
        .title {
            flex: 2;
            padding: 0 15px;
        }
        .artist {
            flex: 1.5;
            font-weight: 300;
            padding: 0 10px;
            a {
                opacity: 0.7;
                transition: all 0.3s ease;
                &:hover {
                    opacity: 1;
                    cursor: pointer;
                }
                &:after {
                    content: ", ";
                }
                &:last-child:after {
                    content: "";
                }
            }
        }
        .time {
            flex: 0.5;
            padding: 0 5px;
        }
        .actions {
            flex: 0.7;
            display: flex;
            justify-content: space-around;
            padding: 0 5px;
        }
    }
}
</style>
