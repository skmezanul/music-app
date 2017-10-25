<template lang='pug'>
header(:class='{ "scrolled" : scrollPosition > 0 }')
  .header-container
    // navigation
    .header-inner.left
      i.material-icons(@click='routerGo(-1)') keyboard_arrow_left

      i.material-icons(@click='routerGo(1)') keyboard_arrow_right
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
      router-link.current-user(
        tag='div',
        :to='$toRoute("user", { id: currentUser.id })')
        .avatar-container
          img(
            :src='currentUser.images[0].url',
            :alt='currentUser.display_name')

        span(v-if='$mq.desktop') {{ currentUser.display_name }}
      i.toggle.material-icons(@click='toggleDropdown') keyboard_arrow_down
      // user dropdown
      ul.dropdown(
        v-if='userDropdown',
        v-on-clickaway='toggleDropdown',
        @click='toggleDropdown')
        router-link(tag='li', :to='$toRoute("myaccount")') {{ $t('myaccount') }}
        router-link(tag='li', :to='$toRoute("settings")') {{ $t('settings') }}
        router-link(tag='li', :to='$toRoute("debug")') {{ $t('debug') }}
        li(@click='logout') {{ $t('logout') }}
</template>

<script>
import { mapGetters } from 'vuex';
import { directive as onClickaway } from 'vue-clickaway';

export default {
  data() {
    return {
      userDropdown: false,
      searchQuery: '',
      scrollPosition: null,
    };
  },
  methods: {
    // update scroll position
    updateScroll() {
      this.scrollPosition = window.scrollY;
    },

    logout() {
      this.$store.commit('REMOVE_TOKEN');
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
      };
    },

    // go one route back or forward
    routerGo(direction) {
      this.$router.go(direction);
    },

    // toggle user dropdown
    toggleDropdown() {
      this.userDropdown = !this.userDropdown;
    },
  },
  computed: {
    ...mapGetters({
      currentUser: 'getCurrentUser',
    }),
  },
  mounted() {
    window.addEventListener('scroll', this.updateScroll, {
      passive: true,
    });
  },
  destroy() {
    window.removeEventListener('scroll', this.updateScroll, {
      passive: true,
    });
  },
  directives: {
    onClickaway,
  },
};
</script>

<style lang='scss'>
header {
    @include fixed($top: 0, $right: 0, $left: 0, $z-index: 998);
    @include flex($display: flex, $justify: center);
    padding: 13px 0;
    border-bottom: 1px solid;
    border-color: transparent;
    transition: background-color 0.3s, border-color 0.3s;
    transform: translateZ(0);
    -webkit-app-region: drag;

    &.scrolled {
      border-color: $border-color;
      background-color: $dark-blue;
        .header-container {
          width: $small-width;
        }
    }

    .header-container {
        @include flex($display: flex, $justify: space-between);
        height: 42px;
        transition: width 0.3s;
        will-change: width;
        @media (max-width: $breakpoint-mobile) {
            width: 95%;
        }

        .header-inner {
            @include flex($display: flex, $align: center);

            &.left {
                @media (min-width: $breakpoint-mobile) {
                    @include flex($justify: flex-start, $flex: 1);
                }

                i {
                    @include item-hover;
                    font-size: 2.2em;
                }
            }

            &.middle {
                @include relative;
                margin: 0 10px;
                @media (max-width: $breakpoint-mobile) {
                    width: 100%;
                }
                @media (min-width: $breakpoint-mobile) {
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
                    color: $white;
                    letter-spacing: 1.3px;
                    transition: background-color 0.3s, box-shadow 0.3s;
                    -webkit-app-region: no-drag;
                    -webkit-font-smoothing: subpixel-antialiased;
                    &:focus {
                        background-color: rgba($white,0.2);
                        box-shadow: $shadow;
                    }

                    &::-webkit-input-placeholder {
                        color: rgba($white,0.4);
                    }
                }
                .search-icon {
                    @include absolute($top: 9px, $left: 17px, $z-index: 2);
                    color: rgba($white, 0.5);
                }
            }

            &.right {
                @include relative;
                @media (min-width: $breakpoint-mobile) {
                    @include flex($justify: flex-end, $flex: 1);
                }

                .current-user {
                  @include flex($display: flex, $align: center);
                  &:hover {
                    cursor: pointer;
                  }

                  .avatar-container {
                      width: 34px;
                      height: 34px;
                      border-radius: 100%;
                      overflow: hidden;
                      img {
                          height: 100%;
                          width: auto;
                      }
                  }

                  span {
                      padding-left: 10px;
                  }

                }

                i {
                    @include item-hover;
                    padding-left: 10px;
                }
            }
        }
    }
}
</style>
