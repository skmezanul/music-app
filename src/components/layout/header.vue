<template lang='pug'>
header(:class='{ "scrolled" : scrollPosition > 0 }')
	.header-container
		// navigation
		.header-inner.left
			i.back.material-icons(@click='routerGo(-1)') keyboard_arrow_left

			i.forward.material-icons(@click='routerGo(1)') keyboard_arrow_right
		// search
		.header-inner.middle
			i.material-icons.search-icon search
			input(
				type='text',
				@keyup.enter='doSearch',
				v-model='searchQuery',
				:placeholder='$tc("search", 0)')

		// current user
		.header-inner.right
			a.github-hint(href='https://github.com/microeinhundert/music-app', target='_blank') Visit on GitHub
</template>

<script>
export default {
  data() {
    return {
      searchQuery: '',
      scrollPosition: null,
      viewContainer: document.querySelector('.view-container'),
    };
  },
  methods: {
    // update scroll position
    updateScroll() {
      this.scrollPosition = this.viewContainer.scrollTop;
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
    this.viewContainer.addEventListener('scroll', this.updateScroll, {
      passive: true,
    });
  },
  destroy() {
    this.viewContainer.removeEventListener('scroll', this.updateScroll, {
      passive: true,
    });
  },
};
</script>

<style lang='scss'>
header {
    @include absolute($top: 0, $right: 0, $left: 0, $z-index: 998);
    @include flex($display: flex, $justify: center);
    padding: 13px 0;
    border-bottom: 1px solid;
    border-color: transparent;
    transition: background-color 0.3s, border-color 0.3s;
    -webkit-app-region: drag;

    &.scrolled {
        border-color: $border-color;
        background-color: $dark-grey;
        .header-container {
            width: $small-viewport-width;
        }
    }

    .header-container {
        @include flex($display: flex, $justify: space-between);
        height: 42px;
        transition: width 0.3s;
        will-change: width;
        width: $large-viewport-width;
        @media (max-width: $view-width-breakpoint) {
            width: $small-viewport-width;
        }

        .header-inner {
            @include flex($display: flex, $align: center);

            &.left {
                @media (min-width: $mobile-breakpoint) {
                     @include flex($justify: flex-start, $flex: 1);
                }

                i {
                    @include item-hover;
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
                input {
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
                    @include absolute($top: 9px, $left: 17px, $z-index: 2);
                    @include font($color: rgba($white,0.5));
                }
            }

            &.right {
                @include relative;
                @media (min-width: $mobile-breakpoint) {
                     @include flex($justify: flex-end, $flex: 1);
                }
                .github-hint {
                    border: 2px solid rgba($white, 0.5);
                    border-radius: 30px;
                    font-size: 0.9em;
                    padding: 7px 15px;
                    text-transform: uppercase;
                    @include item-hover;
                }
            }
        }
    }
}
</style>
