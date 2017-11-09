<template lang="pug">
.stage(:class='{ "has-cover" : hasCover, "is-compact" : isCompact, "has-image" : image }')

  // background
  transition(name='zoom-out', appear)
    .background-container(v-if='image')
      img(
        v-parallax='0.5',
        :src='image',
        :alt='title')

  .stage-container
    .cover-container(
      v-if='hasCover && !$mq.phone',
      :class='{ "is-small" : hasSmallCover }')

      img(
        :src='image',
        :alt='title')

    // content
    .stage-inner
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
    nav.subnav-container(v-if='navigation && !$mq.phone')
      ul
        li(v-for='navitem in navigation')
          router-link(:to='$toRoute(navitem.name, { id: $route.params.id })') {{ navitem.title }}
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
    @include relative;
    @include flex($display: flex, $justify: center, $align: flex-end);
    overflow: hidden;
    margin-top: 0;
    margin-bottom: 20px;
    padding-top: 69px;
    min-height: 350px;
    width: 100%;
    height: 550px;

    &:not(.has-image) {
      background-color: var(--accent-color);
      transition: background-color 1s;
      filter: saturate(80%);
    }

    &.is-compact {
        height: 350px;
        .background-container {
            img {
                filter: saturate(150%) blur(40px);
            }
        }
        .stage-container {
            .stage-inner {
                h1 {
                    @include font($size: 3.5em);
                }
            }
        }
    }

    &.has-cover {
        .stage-container {
            @include flex($align: center, $direction: row, $wrap: wrap);
            .subnav-container {
                @include flex($basis: 100%);
            }
        }
    }

    .background-container {
        @include absolute($top: 0, $right: 0, $bottom: 0, $left: 0, $z-index: 1);
        @include flex($display: flex, $justify: center, $align: center);

        img {
          display: block;
          width: 100vw;
          height: 100vh;
          filter: saturate(130%);
          object-fit: cover;
        }
    }
    &:after {
        @include absolute($top: 0, $right: 0, $bottom: 0, $left: 0, $z-index: 1);
        background: ease-in-out-sine-gradient(to top, $main-bg-color, rgba($main-bg-color, 0)), radial-gradient(circle, rgba($main-bg-color, 0), $main-bg-color);
        content: "";
    }

    .stage-container {
        z-index: 996;
        @include flex($display: flex, $direction: column);

        .cover-container {
            overflow: hidden;
            margin-right: 35px;
            min-width: 250px;
            width: 250px;
            height: 250px;
            border-radius: 10px;
            box-shadow: $shadow;
            &:not(.is-small) {
              @include flex($flex: 1);
            }

            &.is-small {
                min-width: 180px;
                width: 180px;
                height: 180px;
            }
        }

        .stage-inner {
            @include flex($display: flex, $direction: column, $flex: 4);

            h1 {
                margin-left: -3px;
                @include font($size: 5.5em);
            }

            h2 {
                margin-bottom: 5px;
            }

            .meta-container {
                margin-top: 10px;
                width: 80%;
                p {
                    margin: 0;
                    @include font($size: 1.2em, $line: 1.3em, $color: rgba($white, 0.7));
                    a:link {
                        @include font($size: inherit);
                        transition: color 0.3s;
                        &:hover {
                            @include font($color: $white);
                        }
                    }
                }
            }
        }
    }
}

nav {
    &.subnav-container {
        margin-top: 15px;

        ul {
            @include flex($display: flex);

            li {
                margin-right: 50px;
                padding: 15px 0;
                a {
                    @include font($size: 0.9em, $spacing: 2px, $transform: uppercase, $color: rgba($white, 0.5));
                    transition: color 0.5s;

                    &.exact-active {
                        color: $white;
                        &:after {
                            @include relative;
                            top: 0.9em;
                            display: block;
                            margin: 0 auto;
                            width: 40px;
                            height: 3px;
                            background-color: var(--accent-color);
                            content: "";
                        }
                    }
                    &:not(.active):hover {
                        @include font($color: rgba($white, 0.7));
                        cursor: pointer;
                    }
                }
            }
        }
    }
}
</style>
