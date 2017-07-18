<template>
<div class="stage">

  <!--Background-->
  <div class="stage-background">
    <parallax :speedFactor="0.3">
      <img v-show="$route.meta.header === 'full' || type === 'album'" :src="image" :alt="title" />
    </parallax>
  </div>

  <div class="stage-inner">

    <!--Content-->
    <div class="stage-container">
      <h2>{{ type }}</h2>
      <h1>{{ title }}</h1>
      <div v-if="primaryinfo != null" class="info-container">
        <a>{{ primaryinfo }}</a><a v-if="secondaryinfo != null">{{ secondaryinfo }}</a>
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
    <nav v-if="navigation != null" class="subnav mobile-hidden" v-in-viewport='69'>
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
    'primaryinfo',
    'secondaryinfo'
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

    .stage-background {
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;

        .Masthead {
            min-height: 100% !important;

            img {
                animation: zoomOut 0.3s 0.2s both;
                filter: saturate(150%);
            }
        }
    }
    &:after {
        position: absolute;
        top: 0;
        right: 0;
        bottom: 0;
        left: 0;
        background: radial-gradient(circle, rgba($main-bg-color, 0) 0%, $main-bg-color), linear-gradient(rgba($main-bg-color, 0) -30%, $main-bg-color);
        content: "";
    }

    .stage-inner {
        display: flex;
        flex-direction: column;
        z-index: 996;

        .stage-container {
            display: flex;
            flex-direction: column;
            animation: zoomOut 0.3s 0.2s both;

            h1 {
                transition: font-size 0.3s;
                font-size: 5em;
                max-width: 90%;
                margin: 0 0 5px -5px;
                text-transform: uppercase;
            }
            .info-container {
                a {
                    text-transform: uppercase;
                    @include comma-separated(1.2em, 400);
                }
            }
            .button-container {
                margin-top: 15px;
                display: flex;
                align-items: center;

                .button-group {
                    display: flex;
                    box-shadow: $shadow;
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

        &.above-viewport {
            position: fixed;
            top: 69px;
            left: 0;
            right: 0;
            z-index: 999;
            margin-top: 0;
            display: flex;
            justify-content: center;
            background-color: $dark-blue;
            border-bottom: 1px solid $border-color;
        }

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
            .stage-inner {
                .stage-container {
                    h1 {
                        font-size: 3.5em;
                    }
                }
            }
        }
    }
}
</style>
