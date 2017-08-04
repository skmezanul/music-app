<template>
<header class="header">
  <div class="header-inner">
    <div class="top left">
      <i class="material-icons" @click="goBack">keyboard_arrow_left</i>
      <i class="material-icons" @click="goForward">keyboard_arrow_right</i>
    </div>
    <div class="top center" @keyup.esc="toggleSearch" @keyup.enter="fetchdata" :class="{ 'search-active': searchDropdown === true }">
      <i class="material-icons search-icon">search</i>
      <input type="text" @click="toggleSearch" v-model="searchQuery" placeholder="Search" />

      <!--Search Dropdown-->
      <div class="search-dropdown" v-if="searchDropdown === true" v-on-clickaway="toggleSearch">
        <search
        :searchQuery="searchQuery"
        :searchDropdown="searchDropdown"
        ></search>
      </div>

    </div>
    <div class="top right">
      <img
      :src="$store.state.currentUser.images[0].url"
      :alt="$store.state.currentUser.display_name"
      class="user-avatar mobile-hidden" 
      />
      <a href="" class="user-name mobile-hidden">{{ $store.state.currentUser.display_name }}</a>
      <i class="toggle material-icons" @click="toggleDropdown">keyboard_arrow_down</i>

      <!--User Dropdown-->
      <ul class="dropdown" v-if="userDropdown" v-on-clickaway="toggleDropdown">
        <li>My Account</li>
        <li>Settings</li>
        <li>Logout</li>
      </ul>

    </div>
  </div>
</header>
</template>

<script>
import router from '../router'
import {
  directive as onClickaway
} from 'vue-clickaway';

export default {
  directives: {
    onClickaway: onClickaway,
  },
  data() {
    return {
      userDropdown: false,
      searchDropdown: false,
      searchQuery: ''
    }
  },
  methods: {
    goBack() {
      router.go(-1)
    },
    goForward() {
      router.go(1)
    },
    toggleSearch() {
      this.searchDropdown = !this.searchDropdown
    },
    toggleDropdown() {
      this.userDropdown = !this.userDropdown
    }
  }
}
</script>

<style lang="scss">
.header {
    display: flex;
    justify-content: center;
    border-bottom: 1px solid;
    border-color: transparent;
    background-color: transparent;
    position: fixed;
    top: 0;
    right: 0;
    left: 0;
    z-index: 999;
    padding: 13px 0;
    transition: background-color 0.3s, border-color 0.3s;
    -webkit-app-region: drag;

    .header-inner {
        display: flex;
        justify-content: space-between;
        @media screen and (max-width: 955px) {
            width: 95%;
        }
        transition: width 0.3s;
        will-change: width;
        height: 42px;

        .top {
            display: flex;
            align-items: center;

            &.left {
                @media screen and (min-width: 955px) {
                    justify-content: flex-start;
                    flex: 1;
                }

                i {
                    font-size: 2.2em;
                    @include item-hover;
                }
            }

            &.center {
                margin: 0 10px;
                position: relative;
                @media screen and (max-width: 955px) {
                    width: 100%;
                }
                @media screen and (min-width: 955px) {
                    flex: 2;
                }
                &.search-active {
                    input {
                        border-radius: 5px 5px 0 0;
                        background-color: lighten($dark-blue, 5%);
                        border-width: 1px 1px 0 1px;
                        box-shadow: $shadow;

                        &::-webkit-input-placeholder {
                            visibility: hidden;
                        }
                    }
                    .search-icon {
                        color: $white;
                    }
                }
                input {
                    border: none;
                    padding: 12px 12px 12px 50px;
                    border: solid $border-color;
                    border-width: 0;
                    box-sizing: border-box;
                    background-color: rgba($white,0.1);
                    z-index: 1;
                    width: 100%;
                    color: $white;
                    border-radius: 5px;
                    letter-spacing: 1.3px;
                    outline: 0;

                    &::-webkit-input-placeholder {
                        color: rgba($white,0.4);
                    }
                }
                .search-icon {
                    color: rgba($white, 0.5);
                    position: absolute;
                    left: 17px;
                    top: 9px;
                    z-index: 2;
                }
                .search-dropdown {
                    position: absolute;
                    top: 42px;
                    left: 0;
                    right: 0;
                    z-index: 999;
                    max-height: 500px;
                    padding: 20px;
                    box-sizing: border-box;
                    border: 1px solid $border-color;
                    background-color: lighten($dark-blue, 3%);
                    box-shadow: $shadow;
                    border-radius: 0 0 5px 5px;
                    overflow-y: auto;
                }
            }

            &.right {
                position: relative;
                @media screen and (min-width: 955px) {
                    justify-content: flex-end;
                    flex: 1;
                }

                .user-avatar {
                    border-radius: 100%;
                    height: 34px;
                    width: 34px;
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
