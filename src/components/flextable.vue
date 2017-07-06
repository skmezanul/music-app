<template>
<ol class="flex-table">
  <li class="table-row">
    <div class="image">
      <i class="material-icons">play_arrow</i>
      <img src="/static/images/cover4.png" alt="First duration" height="100%" />
    </div>
    <span class="index mobile-hidden">01</span>
    <div class="meta-container">
      <span class="title">First Time</span>
      <div class="artist"><a>Kygo</a><a>Ellie Goulding</a></div>
    </div>
    <span class="duration">3:14</span>
    <i class="material-icons" v-tooltip="{ content: 'Add to playlist', container: '.tooltip-container' }">playlist_add</i>
    <i class="material-icons" v-tooltip="{ content: 'More', container: '.tooltip-container' }">more_horiz</i>
  </li>
  <li class="table-row">
    <div class="image">
      <i class="material-icons">play_arrow</i>
      <img src="/static/images/cover2.png" alt="Love Me Like You Do" height="100%" />
    </div>
    <span class="index mobile-hidden">02</span>
    <div class="meta-container">
      <span class="title">Love Me Like You Do</span>
      <div class="artist"><a>Ellie Goulding</a></div>
    </div>
    <span class="duration">4:13</span>
    <i class="material-icons" v-tooltip="{ content: 'Add to playlist', container: '.tooltip-container' }">playlist_add</i>
    <i class="material-icons" v-tooltip="{ content: 'More', container: '.tooltip-container' }">more_horiz</i>
  </li>
  <li class="table-row">
    <div class="image">
      <i class="material-icons">play_arrow</i>
      <img src="/static/images/cover1.png" alt="Burn" height="100%" />
    </div>
    <span class="index mobile-hidden">03</span>
    <div class="meta-container">
      <span class="title">Burn</span>
      <div class="artist"><a>Ellie Goulding</a></div>
    </div>
    <span class="duration">3:51</span>
    <i class="material-icons" v-tooltip="{ content: 'Add to playlist', container: '.tooltip-container' }">playlist_add</i>
    <i class="material-icons" v-tooltip="{ content: 'More', container: '.tooltip-container' }">more_horiz</i>
  </li>
</ol>
</template>
<style lang="scss">
.flex-table {
  box-shadow: $shadow;
    .table-row {
        display: flex;
        align-items: center;
        transition: background-color 0.3s;
        margin: 2px 0;
        background-color: $blue;
        &:hover {
            background-color: rgba($white, 0.1);
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
            transition: color 0.3s;
            flex: 0.13;
            @media screen and (max-width: 955px) {
                padding: 0 15px;
            }
            &:hover {
                color: rgba($white, 0.7);
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
                    color: rgba($white, 0.7);
                    transition: color 0.3s;
                    &:hover {
                        color: $white;
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
