<template lang="pug">
.stage(:class='{ "is-large" : $route.meta.stage.large, "has-cover" : $route.meta.stage.cover, "has-image" : stage.image }')

  // background
  transition(v-if='stage.image', name='zoom-out', appear)
    .background-container
      img(
        v-parallax='0.5',
        :src='stage.image',
        :alt='stage.title')

  .stage-container
    .cover-container(
      v-if='$route.meta.stage.cover && !$mq.phone',
      :class='{ "is-small" : $route.meta.stage.cover && $route.name === "user" }')

      img(
        :src='stage.image',
        :alt='stage.title')

    // content
    .stage-inner
      h2(v-if='subtitle || stage.subtitle') {{ subtitle || stage.subtitle }}
      h1(v-if='title || stage.title') {{ title || stage.title }}
      .meta-container(v-if='stage.meta && !$mq.phone')
        p(v-html='$formatValue(stage.meta)')
      .button-container(v-if='stage.buttons || $route.meta.stage.shareButton')
        .button-group(v-if='stage.buttons')
          ma-button(
            v-for='(button, index) in stage.buttons',
            :key='index',
            :ref='`button-${button.title}`',
            :type='{ "accent" : index === 0 }',
            :class='button.title',
            :icon='button.icon',
            :title='button.title')
        ma-button(
          v-if='$route.meta.stage.shareButton',
          :ref='button-share',
          type='transparent',
          class='share',
          icon='share',
          title='share')

      // navigation
    nav.subnav-container(v-if='stage.navigation && !$mq.phone')
      ul
        li(v-for='navitem in stage.navigation')
          router-link(:to='$toRoute(navitem.routeName, { id: $route.params.id })') {{ navitem.title }}
</template>

<script>
import { mapGetters } from 'vuex';

export default {
  props: [
    'title',
    'subtitle',
  ],
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
    display: grid;
    overflow: hidden;
    padding-top: 69px;
    min-height: 350px;
    height: 350px;
    transition: background-color 1s;
    grid-area: stage;
    grid-template-areas: ". content .";
    @include view-grid-columns;

    &:not(.has-image) {
      background-color: var(--accent-color);
      filter: saturate(80%);
    }

    &:not(.is-large) {
      .background-container {
          img {
              filter: saturate(150%) blur(40px);
          }
      }
    }

    &.is-large {
        height: 550px;
        .stage-container {
            .stage-inner {
                h1 {
                    @include font($size: 5.5em);
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
        @include flex($display: flex, $direction: column);
        z-index: 996;
        grid-area: content;

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
            @include flex($display: flex, $justify: flex-end, $direction: column, $flex: 4);

            h1 {
                @include font($size: 3.5em);
                margin-left: -3px;
            }

            h2 {
                margin-bottom: 5px;
            }

            .meta-container {
                margin-top: 10px;
                width: 80%;
                p {
                    @include font($size: 1.2em, $line: 1.3em, $color: rgba($white, 0.7));
                    margin: 0;
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
