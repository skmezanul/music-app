<template lang='pug'>
header.header.sidebar-margin(:class='{ "scrolled" : scrollPosition > 0 }')
  .header-container
    // navigation
    .header-inner.left
      ma-icon.navigation.back(:hover='true', @click.native='routerGo(-1)') keyboard_arrow_left

      ma-icon.navigation.forward(:hover='true', @click.native='routerGo(1)') keyboard_arrow_right
    // search
    .header-inner.middle
      ma-icon.search-icon search
      input.search-field(
        type='text',
        @keyup.enter='doSearch',
        v-model='searchQuery',
        :placeholder='$tc("search", 0)')

    // current user
    .header-inner.right
      ma-button.github-hint(title='Visit on GitHub', href='https://github.com/microeinhundert/music-app', target='_blank')
</template>

<script>
export default {

  data: () => ({
    searchQuery: '',
    scrollPosition: null,
  }),

  methods: {
    // update scroll position
    updateScroll() {
      this.scrollPosition = window.scrollY;
    },

    // do the search
    doSearch() {
      const query = this.searchQuery;
      if (query.length > 0) {
        this.$router.push({
          name: 'search',
          params: {
            query,
          },
        });
      }
    },

    // go one route back or forward
    routerGo(direction) {
      this.$router.go(direction);
    },
  },

  mounted() {
    // add event listeners
    window.addEventListener('scroll', () => {
      this.updateScroll();
    });
  },

  destroy() {
    // remove event listeners
    window.removeEventListener('scroll');
  },

};
</script>

<style lang='scss'>
.header {
    @include fixed($top: 0, $right: 0, $left: 0, $index: 998);
    @include flex($display: flex, $justify: center);
    padding: 13px 0;
    border-bottom: 1px solid;
    border-color: transparent;
    transform: translateZ(0);
    transition: background-color 0.3s, border-color 0.3s;
    -webkit-app-region: drag;

    &.scrolled {
        border-color: $border-color;
        background-color: $dark-blue;
        .header-container {
            width: $small-viewport-width;
        }
    }

    .header-container {
        @include flex($display: flex, $justify: space-between);
        transition: width 0.3s;
        will-change: width;
        size: $large-viewport-width 42px;
        @media (max-width: $view-width-breakpoint) {
            width: $small-viewport-width;
        }

        .header-inner {
            @include flex($display: flex, $align: center);

            &.left {
                @media (min-width: $mobile-breakpoint) {
                     @include flex($justify: flex-start, $flex: 1);
                }

                .navigation {
                    @include font($size: 2.2em);
                    &.back {
                        &:hover {
                            transform: translateX(-2px);
                        }
                    }
                    &.forward {
                        &:hover {
                            transform: translateX(2px);
                        }
                    }
                }
            }

            &.middle {
                @include relative;
                margin: 0 10px;
                @media (max-width: $mobile-breakpoint) {
                    width: 100%;
                }
                @media (min-width: $mobile-breakpoint) {
                     @include flex($flex: 2);
                }
                .search-field {
                    z-index: 1;
                    padding: 12px 12px 12px 50px;
                    width: 100%;
                    outline: 0;
                    border: none;
                    border-radius: 5px;
                    background-color: rgba($white,0.1);
                    @include font($spacing: 1.3px, $color: $white);
                    transition: background-color 0.3s, box-shadow 0.3s;
                    -webkit-app-region: no-drag;
                    &:focus {
                        background-color: rgba($white,0.2);
                        box-shadow: $shadow;
                    }

                    &::-webkit-input-placeholder {
                        @include font($color: rgba($white,0.4));
                    }
                }
                .search-icon {
                    @include absolute($top: 9px, $left: 17px, $index: 2);
                    @include font($color: rgba($white,0.5));
                }
            }

            &.right {
                @include relative;
                @media (min-width: $mobile-breakpoint) {
                     @include flex($justify: flex-end, $flex: 1);
                }
                .github-hint {
                    &:not(:hover) {
                      @include font($color: rgba($white, 0.7));
                    }
                }
            }
        }
    }
}
</style>
