<template lang='pug'>
header
  .header-container
    // navigation
    .header-inner.left
      i.material-icons(@click='routerGo(-1)') keyboard_arrow_left

      i.material-icons(@click='routerGo(1)') keyboard_arrow_right
    // search
    .header-inner.center
      i.material-icons.search-icon search
      input(
        type='text',
        @keyup.enter='startSearch',
        v-model='searchQuery',
        :placeholder='$tc("search", 0)')

    // current user
    .header-inner.right
      img.user-avatar.mobile-hidden(
        :src='$store.state.currentUser.images[0].url',
        :alt='$store.state.currentUser.display_name')

      router-link.user-name.mobile-hidden(to='/') {{ $store.state.currentUser.display_name }}
      i.toggle.material-icons(@click='toggleDropdown') keyboard_arrow_down
      // user dropdown
      ul.dropdown(
        v-if='userDropdown',
        v-on-clickaway='toggleDropdown',
        @click='toggleDropdown')
        router-link(tag='li', :to='toTarget("myaccount")') {{ $t('myaccount') }}
        router-link(tag='li', :to='toTarget("settings")') {{ $t('settings') }}
        router-link(tag='li', :to='toTarget("logout")') {{ $t('logout') }}
</template>

<script>
import {
  directive as onClickaway,
} from 'vue-clickaway';

export default {
  data() {
    return {
      userDropdown: false,
      searchQuery: '',
    };
  },
  methods: {
    // to target
    toTarget(name) {
      const target = {
        name,
      };
      return target;
    },

    // start the search
    startSearch() {
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
  directives: {
    onClickaway,
  },
};
</script>

<style lang='scss'>
header {
    position: fixed;
    top: 0;
    right: 0;
    left: 0;
    z-index: 998;
    display: flex;
    justify-content: center;
    padding: 13px 0;
    border-bottom: 1px solid;
    border-color: transparent;
    transition: background-color 0.3s, border-color 0.3s;
    transform: translateZ(0);
    -webkit-app-region: drag;

    .header-container {
        display: flex;
        justify-content: space-between;
        height: 42px;
        transition: width 0.3s;
        will-change: width;
        @media screen and (max-width: 955px) {
            width: 95%;
        }

        .header-inner {
            display: flex;
            align-items: center;

            &.left {
                @media screen and (min-width: 955px) {
                    flex: 1;
                    justify-content: flex-start;
                }

                i {
                    @include item-hover;
                    font-size: 2.2em;
                }
            }

            &.center {
                position: relative;
                margin: 0 10px;
                @media screen and (max-width: 955px) {
                    width: 100%;
                }
                @media screen and (min-width: 955px) {
                    flex: 2;
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
                    position: absolute;
                    top: 9px;
                    left: 17px;
                    z-index: 2;
                    color: rgba($white, 0.5);
                }
            }

            &.right {
                position: relative;
                @media screen and (min-width: 955px) {
                    flex: 1;
                    justify-content: flex-end;
                }

                .user-avatar {
                    width: 34px;
                    height: 34px;
                    border-radius: 100%;
                }

                .user-name {
                    padding: 0 10px;
                }

                i {
                    @include item-hover;
                }
            }
        }
    }
}
</style>
