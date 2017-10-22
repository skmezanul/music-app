<template lang="pug">
.stage(:class='{ "has-cover" : hasCover, "is-compact" : isCompact }')

  // background
  transition(name='zoom-out', appear)
    .background-container(v-if='image')
      img(
        v-parallax='0.5',
        :src='image',
        :alt='title')

  transition(name='fade', appear)
    .stage-inner
      .cover-container(
        v-if='hasCover && !$mq.phone',
        :class='{ "is-small" : hasSmallCover }')

        img(
          :src='image',
          :alt='title')

      // content
      .stage-container
        h2 {{ subtitle }}
        h1 {{ title }}
        .meta-container(v-if='meta && !$mq.phone')
          p(v-html='$formatValue(meta)')
        .button-container(v-if='$route.meta.buttons')
          .button-group
            ma-button(
              type='accent',
              icon='play_circle_filled',
              title='playall')
            ma-button(
              v-if='$includes($route.name, "album")',
              icon='save',
              title='save')
            ma-button(
              v-if='$includes($route.name, "artist|playlist")',
              icon='add_circle',
              title='follow')
          ma-button(
            type='transparent',
            icon='share',
            title='share')

      // navigation
      nav.subnav(v-if='navigation && !$mq.phone')
        ul
          li(v-for='navitem in navigation')
            router-link(:to='$toTarget(navitem.name, $route.params.id)') {{ navitem.title }}
</template>

<script>
export default {
  props: [
    'subtitle',
    'navigation',
    'image',
    'title',
    'meta',
  ],
  computed: {
    // check if stage has cover
    hasCover() {
      const hasCover = this.$route.meta.cover;
      if (hasCover) {
        return true;
      }
      return false;
    },

    // check if stage has small cover
    hasSmallCover() {
      const that = this,
            smallCover = that.hasCover && that.$includes(that.$route.name, 'user');
      if (smallCover) {
        return true;
      }
      return false;
    },

    // check if stage is compact
    isCompact() {
      const isCompact = this.$route.meta.compact;
      if (isCompact) {
        return true;
      }
      return false;
    },
  },
};
</script>

<style lang="scss">
.stage {
    position: relative;
    display: flex;
    align-items: flex-end;
    justify-content: center;
    overflow: hidden;
    margin-top: 0;
    margin-bottom: 20px;
    padding-top: 69px;
    min-height: 350px;
    width: 100%;
    height: 550px;

    &.is-compact {
        height: 350px;
        .background-container {
            img {
                filter: saturate(150%) blur(40px);
            }
        }
        .stage-inner {
            .stage-container {
                h1 {
                    font-size: 3.5em;
                }
            }
        }
    }

    &.has-cover {
        .stage-inner {
            flex-direction: row;
            flex-wrap: wrap;
            align-items: center;
            .subnav {
                flex-basis: 100%;
            }
        }
    }

    .background-container {
        @include position(absolute, 1);
        @include flex-center;

        img {
          display: block;
          width: 100vw;
          height: 100vh;
          object-fit: cover;
          filter: saturate(130%);
        }
    }
    &:after {
        @include position(absolute, 1);
        background: ease-in-out-sine-gradient(to top, $main-bg-color, rgba($main-bg-color, 0)), radial-gradient(circle, rgba($main-bg-color, 0), $main-bg-color);
        content: "";
    }

    .stage-inner {
        z-index: 996;
        display: flex;
        flex-direction: column;

        .cover-container {
            overflow: hidden;
            margin-right: 35px;
            min-width: 250px;
            width: 250px;
            height: 250px;
            border-radius: 10px;
            box-shadow: $shadow;
            &:not(.is-small) {
              flex: 1;
            }

            &.is-small {
                min-width: 180px;
                width: 180px;
                height: 180px;
            }

            img {
                width: 100%;
                height: auto;
            }
        }

        .stage-container {
            display: flex;
            flex: 4;
            flex-direction: column;

            h1 {
                margin-left: -3px;
                font-size: 5.5em;
            }

            h2 {
                margin-bottom: 5px;
            }

            .meta-container {
                margin-top: 10px;
                width: 80%;
                p {
                    color: rgba($white, 0.7);
                    font-size: 1.2em;
                    line-height: 1.3em;
                    margin: 0;
                    a:link {
                        font-size: inherit;
                        transition: color 0.3s;
                        &:hover {
                            color: $white;
                        }
                    }
                }
            }
        }
    }
}

nav {
    &.subnav {
        margin-top: 15px;

        ul {
            display: flex;

            li {
                margin-right: 50px;
                padding: 15px 0;
                a {
                    color: rgba($white, 0.5);
                    text-transform: uppercase;
                    letter-spacing: 2px;
                    font-size: 0.9em;
                    transition: color 0.5s;

                    &.exact-active {
                        color: $white;
                        &:after {
                            position: relative;
                            top: 0.9em;
                            display: block;
                            margin: 0 auto;
                            width: 40px;
                            height: 3px;
                            background-color: $accent-color;
                            content: "";
                        }
                    }
                    &:not(.active):hover {
                        color: rgba($white, 0.7);
                        cursor: pointer;
                    }
                }
            }
        }
    }
}
</style>
