<template>
<ol class="tracks-table">
  <li class="table-row">
    <div class="image">
      <i class="material-icons">play_arrow</i>
      <img class="image" height="100%" src="/static/images/cover4.png" />
    </div>
    <span class="index mobile-hidden">01</span>
    <i class="addtoplaylist mobile-hidden material-icons" v-tooltip="{ content: 'Add to playlist', container: '.tooltip-container' }">playlist_add</i>
    <span class="title"><a>First Time</a></span>
    <span class="artist"><a>Kygo</a><a>Ellie Goulding</a></span>
    <span class="time">3:14</span>
    <div class="actions mobile-hidden">
      <i class="share material-icons" v-tooltip="{ content: 'Share', container: '.tooltip-container' }">share</i>
      <i class="material-icons" v-tooltip="{ content: 'More', container: '.tooltip-container' }">more_horiz</i>
    </div>
  </li>
  <li class="table-row">
    <div class="image">
      <i class="material-icons">play_arrow</i>
      <img class="image" height="100%" src="/static/images/cover2.png" />
    </div>
    <span class="index mobile-hidden">02</span>
    <i class="addtoplaylist mobile-hidden material-icons" v-tooltip="{ content: 'Add to playlist', container: '.tooltip-container' }">playlist_add</i>
    <span class="title"><a>Love Me Like You Do</a></span>
    <span class="artist"><a>Ellie Goulding</a></span>
    <span class="time">4:13</span>
    <div class="actions mobile-hidden">
      <i class="share material-icons" v-tooltip="{ content: 'Share', container: '.tooltip-container' }">share</i>
      <i class="material-icons" v-tooltip="{ content: 'More', container: '.tooltip-container' }">more_horiz</i>
    </div>
  </li>
  <li class="table-row">
    <div class="image">
      <i class="material-icons">play_arrow</i>
      <img class="image" height="100%" src="/static/images/cover1.png" />
    </div>
    <span class="index mobile-hidden">03</span>
    <i class="addtoplaylist mobile-hidden material-icons" v-tooltip="{ content: 'Add to playlist', container: '.tooltip-container' }">playlist_add</i>
    <span class="title"><a>Burn</a></span>
    <span class="artist"><a>Ellie Goulding</a></span>
    <span class="time">3:51</span>
    <div class="actions mobile-hidden">
      <i class="share material-icons" v-tooltip="{ content: 'Share', container: '.tooltip-container' }">share</i>
      <i class="material-icons" v-tooltip="{ content: 'More', container: '.tooltip-container' }">more_horiz</i>
    </div>
  </li>
</ol>
</template>
<style lang="scss">
.tracks-table {
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
            opacity: 0.7;
            width: 5%;
            font-weight: 300;
            text-align: center;
            padding: 0 5px;
        }
        .title {
            width: 45%;
            padding: 0 15px;
        }
        .artist {
            width: 30%;
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
