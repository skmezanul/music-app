<template>
<div class="bottom-bar">
  <div class="bottom left mobile-hidden">
    <img class="album-cover" src="/static/images/cover4.png" />
    <div class="currently-playing">
      <div class="title">First Time</div>
      <div class="artist">Kygo, Ellie Goulding</div>
    </div>
  </div>
  <div class="bottom center">
    <i class="shuffle material-icons">shuffle</i>
    <i class="skip material-icons">skip_previous</i>
    <i class="play material-icons">play_circle_filled</i>
    <i class="skip material-icons">skip_next</i>
    <i class="repeat material-icons">repeat</i>
  </div>
  <div class="bottom right mobile-hidden">
    <i class="volume material-icons">volume_up</i>
    <i class="cast material-icons">cast</i>
    <i class="queue material-icons">queue_music</i>
  </div>
</div>
</template>

<style lang="scss">
.bottom-bar {
    display: flex;
    position: fixed;
    right: 0;
    bottom: 0;
    left: 0;
    align-items: center;
    box-sizing: border-box;
    padding: 15px 20px;
    background-color: var(--dark-blue);
    z-index: 998;
    border-top: 1px solid var(--border-color);
    transition: all 0.3s ease;
    .bottom {
        display: flex;
        align-items: center;
        height: 50px;
        &.left {
            width: 40%;
            justify-content: flex-start;
            .album-cover {
                height: 50px;
                width: 50px;
                padding-right: 10px;
                border-radius: 3px;
                box-shadow: 0 3px 3px var(--shadow-color);
            }
            .currently-playing {
                .title {
                    font-size: 1.2em;
                }
                .artist {
                    opacity: 0.7;
                    font-size: 0.9em;
                    font-weight: 300;
                }
            }
        }
        &.right {
            width: 40%;
            justify-content: flex-end;
            i {
                padding-left: 20px;
            }
        }
        &.center {
            width: 20%;
            justify-content: space-between;
            .play {
                font-size: 3.3em;
                opacity: 1;
                &:hover {
                    transform: scale(1.15);
                }
            }
        }
        i {
            transition: all 0.3s ease;
            opacity: 0.7;
            &:hover {
                opacity: 1;
                cursor: pointer;
            }
        }
    }
}
@media screen and (max-width: 955px) {
    .bottom-bar {
        .bottom {
            &.center {
                width: 100%;
            }
        }
    }
}
@supports (backdrop-filter: blur(5px)) or (-webkit-backdrop-filter: blur(5px)) {
    .bottom-bar {
        background-color: var(--dark-blue-transparent);
        backdrop-filter: saturate(200%) blur(20px);
        -webkit-backdrop-filter: saturate(200%) blur(20px);
    }
}
</style>
