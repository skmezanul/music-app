<template lang="pug">
.stage(:class='{ "has-cover" : stage.cover, "is-compact" : stage.size === "compact", "has-image" : stage.image }')

  // background
  transition(name='zoom-out', appear)
    .background-container(v-if='stage.image')
      img(
        v-parallax='0.5',
        :src='stage.image',
        :alt='stage.title')

  .stage-container
    .cover-container(
      v-if='stage.cover && !$mq.phone',
      :class='{ "is-small" : stage.cover === "small" }')

      img(
        :src='stage.image',
        :alt='stage.title')

    // content
    .stage-inner
      h2 {{ stage.subtitle }}
      h1 {{ stage.title }}
      .meta-container(v-if='stage.meta && !$mq.phone')
        p(v-html='$formatValue(stage.meta)')
      .button-container(v-if='stage.buttons')
        .button-group
          ma-button(
            v-for='(button, index) in stage.buttons',
            :type='{ "accent" : index === 0}',
            :icon='button.icon',
            :title='button.title')
        ma-button(
          type='transparent',
          icon='share',
          title='share')

      // navigation
    nav.subnav-container(v-if='stage.navigation && !$mq.phone')
      ul
        li(v-for='navitem in stage.navigation')
          router-link(:to='$toRoute(navitem.name, { id: $route.params.id })') {{ navitem.title }}
</template>

<script>
import { mapGetters } from 'vuex';

export default {
  computed: {
    ...mapGetters({
      stage: 'getStageContent',
    }),
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
