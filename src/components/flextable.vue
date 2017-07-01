<template>
<ol class="flex-table">
  <li class="table-row">
    <div class="image">
      <i class="material-icons">play_arrow</i>
      <img src="/static/images/cover4.png" alt="First duration" height="100%" />
    </div>
    <div class="index mobile-hidden">01</div>
    <div class="meta-container">
      <div class="title">First Time</div>
      <div class="artist"><a>Kygo</a><a>Ellie Goulding</a></div>
    </div>
    <div class="duration">3:14</div>
    <i class="addtoplaylist mobile-hidden material-icons" v-tooltip="{ content: 'Add to playlist', container: '.tooltip-container' }">playlist_add</i>
    <i class="material-icons" v-tooltip="{ content: 'More', container: '.tooltip-container' }">more_horiz</i>
  </li>
  <li class="table-row">
    <div class="image">
      <i class="material-icons">play_arrow</i>
      <img src="/static/images/cover2.png" alt="Love Me Like You Do" height="100%" />
    </div>
    <div class="index mobile-hidden">02</div>
    <div class="meta-container">
      <div class="title">Love Me Like You Do</div>
      <div class="artist"><a>Ellie Goulding</a></div>
    </div>
    <div class="duration">4:13</div>
    <i class="addtoplaylist mobile-hidden material-icons" v-tooltip="{ content: 'Add to playlist', container: '.tooltip-container' }">playlist_add</i>
    <i class="material-icons" v-tooltip="{ content: 'More', container: '.tooltip-container' }">more_horiz</i>
  </li>
  <li class="table-row">
    <div class="image">
      <i class="material-icons">play_arrow</i>
      <img src="/static/images/cover1.png" alt="Burn" height="100%" />
    </div>
    <div class="index mobile-hidden">03</div>
    <div class="meta-container">
      <div class="title">Burn</div>
      <div class="artist"><a>Ellie Goulding</a></div>
    </div>
    <div class="duration">3:51</div>
    <i class="addtoplaylist mobile-hidden material-icons" v-tooltip="{ content: 'Add to playlist', container: '.tooltip-container' }">playlist_add</i>
    <i class="material-icons" v-tooltip="{ content: 'More', container: '.tooltip-container' }">more_horiz</i>
  </li>
</ol>
</template>
<style lang="scss">
.flex-table {
  box-shadow: 0 0 15px var(--shadow-color);
    .table-row {
        display: flex;
        align-items: center;
        transition: background-color 0.3s;
        margin: 2px 0;
        background-color: var(--blue);
        &:hover {
            background-color: rgba(255,255,255,0.1);
            .image i {
                opacity: 1;
            }
        }
        .image {
            height: 60px;
            width: 60px;
            position: relative;
            i {
                opacity: 0;
                position: absolute;
                top: 0;
                bottom: 0;
                left: 0;
                right: 0;
                z-index: 1;
                font-size: 3.8em;
            }
        }
        i {
            transition: opacity 0.3s;
            flex: 0.15;
            @media screen and (max-width: 955px) {
                padding: 0 15px;
            }
            &:hover {
                opacity: 0.7;
                cursor: pointer;
            }
        }
        .index {
            flex: 0.2;
            font-weight: 300;
            text-align: center;
            font-size: 1.3em;
        }
        .meta-container {
            flex: 2;
            line-height: 1.3em;
            @media screen and (max-width: 955px) {
                padding: 0 15px;
            }
            .artist {
                font-weight: 300;
                a {
                    opacity: 0.7;
                    transition: opacity 0.3s;
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
        }
        .duration {
            flex: 0.5;
            text-align: center;
        }
    }
}
</style>
