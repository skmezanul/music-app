<template>
<div class="stage" :class="{'with-cover': type === 'album' || type === 'playlist'}">

  <!--Background-->
  <div class="stage-background">
    <transition name="fade">
      <parallax :speedFactor="0.3">
        <img :src="image" :alt="title" />
      </parallax>
    </transition>
  </div>

  <div class="stage-inner">


    <div class="cover-container mobile-hidden" v-if="type === 'album' || type === 'playlist'">
      <img :src="image" :alt="title" />
    </div>
    <!--Content-->
    <div class="stage-container">
      <h2>{{ type }}</h2>
      <h1>{{ title }}</h1>
      <div v-if="primaryInfo != null" class="info-container mobile-hidden">
        <a>{{ primaryInfo }}</a><a v-if="secondaryInfo != null">{{ secondaryInfo }}</a>
      </div>
      <div class="button-container">
        <div class="button-group">
          <a class="btn btn-accent"><i class="material-icons">play_circle_filled</i>Play All</a>
          <a v-if="type === 'artist'" class="btn"><i class="material-icons">add_circle</i>Follow</a>
          <a class="btn btn-icon"><i class="material-icons">favorite</i></a>
        </div>
        <a class="btn btn-transparent"><i class="material-icons">share</i>Share</a>
      </div>
    </div>

    <!--Navigation-->
    <nav v-if="navigation != null" class="subnav mobile-hidden">
      <ul>
        <li v-for="navitem in navigation">
          <router-link :to="'/'+type+'/'+$route.params.id+'/'+navitem.link">{{ navitem.title }}</router-link>
        </li>
      </ul>
    </nav>

  </div>

</div>
</template>

<script>
export default {
  props: [
    'type',
    'navigation',
    'image',
    'title',
    'primaryInfo',
    'secondaryInfo'
  ]
}
</script>

<style lang="scss">
.stage {
    display: flex;
    position: relative;
    align-items: flex-end;
    justify-content: center;
    width: 100%;
    margin-bottom: 20px;
    padding-top: 65px;
    min-height: 400px;
    height: 550px;
    overflow: hidden;

    &.with-cover {
        .stage-inner {
            flex-direction: row;
            align-items: center;
        }
    }

    .stage-background {
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;

        .Masthead {
            min-height: 100% !important;

            img {
                animation: zoomOut 0.7s 0.2s both;
                will-change: filter;
                filter: saturate(150%);
                transition: filter 0.3s;
            }
        }
    }
    &:after {
        position: absolute;
        top: 0;
        right: 0;
        bottom: 0;
        left: 0;
        background: radial-gradient(circle, rgba($main-bg-color, 0), $main-bg-color), linear-gradient(to top, $main-bg-color, rgba($main-bg-color, 0));
        content: "";
    }

    .stage-inner {
        display: flex;
        flex-direction: column;
        z-index: 996;

        .cover-container {
            height: 250px;
            width: 250px;
            min-width: 250px;
            overflow: hidden;
            border-radius: 10px;
            margin-right: 35px;
            box-shadow: $shadow;
            img {
                width: 100%;
                height: auto;
            }
        }

        .stage-container {
            display: flex;
            flex-direction: column;

            h1 {
                will-change: font-size;
                transition: font-size 0.3s;
                font-size: 5em;
                margin-left: -5px;
                text-transform: uppercase;
            }
            .info-container {
              margin-bottom: 5px;
                a {
                    text-transform: uppercase;
                    @include comma-separated(1.2em, 400);
                }
            }
            .button-container {
                margin-top: 10px;
                display: flex;
                align-items: center;

                .button-group {
                    display: flex;
                    margin: 0 5px 10px 0;
                    border-radius: 5px;
                    overflow: hidden;

                    a {
                        border-radius: 0;
                        margin: 0;
                        &:nth-child(3) {
                            border-left: 1px solid $blue;
                        }
                    }
                }
            }
        }
    }
}

nav {
    &.subnav {
        margin-top: 30px;
        padding-top: 5px;

        ul {
            display: flex;
            justify-content: space-between;

            li {
                padding: 15px 0;
                a {
                    font-size: 0.9em;
                    letter-spacing: 1.7px;
                    line-height: 1em;
                    text-transform: uppercase;
                    transition: color 0.3s;
                    color: rgba($white, 0.5);

                    &.router-link-exact-active {
                        color: $white;
                        &:after {
                            display: block;
                            position: relative;
                            top: 1em;
                            width: 40px;
                            height: 3px;
                            margin: 0 auto;
                            background-color: $accent-color;
                            content: "";
                        }
                    }
                    &:not(.router-link-exact-active):hover {
                        cursor: pointer;
                        color: rgba($white, 0.7);
                    }
                }
            }
        }
    }
}

.main-container {
    &.stage-compact {
        margin-top: -250px;

        .stage {
            .stage-background {
                .Masthead {
                    img {
                        filter: saturate(200%) blur(20px);
                    }
                }
            }
            .stage-inner {
                .stage-container {
                    h1 {
                        font-size: 3.5em;
                        max-height: 130px;
                        overflow: hidden;
                    }
                }
            }
        }
    }
}
</style>
