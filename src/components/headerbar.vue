<template>
<header class="header">
  <div class="header-inner">
    <div class="top left">
      <i class="material-icons" @click="goBack">keyboard_arrow_left</i>
      <i class="material-icons" @click="goForward">keyboard_arrow_right</i>
    </div>
    <div class="top center">
      <i class="material-icons search-icon">search</i>
      <input type="text" @click="searchDropdown = true" v-model="searchQuery" :class="{active: searchDropdown === true}" placeholder="Search" />

      <!--Search Dropdown-->
      <transition name="fade">
        <div class="search-dropdown" v-if="searchDropdown === true">
          <i class="material-icons">search</i>
          <p v-if="searchQuery.length === 0">Search for tracks, albums, artists or playlists.</p>
          <p v-else>No results found for "{{ searchQuery }}".</p>
        </div>
      </transition>

    </div>
    <div class="top right">
      <img src="/static/images/avatar.jpg" alt="Avatar" class="user-avatar mobile-hidden" />
      <a href="" class="user-name mobile-hidden">Leon S.</a>
      <i class="toggle material-icons" @click="userDropdown = !userDropdown">keyboard_arrow_down</i>
      <!--User Dropdown-->
      <ul class="dropdown" v-if="userDropdown">
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
export default {
  data() {
    return {
      userDropdown: false,
      searchDropdown: false,
      searchQuery: ''
    }
  },
  methods: {
    goBack: function() {
      router.go(-1)
    },
    goForward: function() {
      router.go(1)
    }
  }
}
</script>

<style lang="scss">
.header {
    display: flex;
    justify-content: center;
    position: fixed;
    border-bottom: 1px solid;
    border-color: transparent;
    background-color: transparent;
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
                }
            }

            &.center {
                position: relative;
                @media screen and (max-width: 955px) {
                    width: 100%;
                }
                @media screen and (min-width: 955px) {
                    flex: 2;
                }

                input {
                    border: none;
                    padding: 12px 12px 12px 50px;
                    width: 100%;
                    background-color: rgba($white,0.1);
                    z-index: 1;
                    color: $white;
                    border-radius: 3px;
                    transition: background-color 0.2s, box-shadow 0.2s;
                    letter-spacing: 1.3px;
                    margin: 0 10px;
                    outline: 0;

                    &.active {
                      border-radius: 5px 5px 0 0;
                      background-color: rgba($white,0.2);
                      box-shadow: $shadow;
                      border-color: $border-color;

                      &::-webkit-input-placeholder {
                          visibility: hidden;
                      }
                    }

                    &::-webkit-input-placeholder {
                        color: rgba($white,0.4);
                    }
                }

                .search-icon {
                    color: rgba($white, 0.5);
                    position: absolute;
                    left: 25px;
                    top: 9px;
                }

                .search-dropdown {
                    position: absolute;
                    top: 43px;
                    left: 0;
                    right: 0;
                    display: flex;
                    align-items: center;
                    justify-content: space-around;
                    flex-direction: column;
                    height: 170px;
                    padding: 15px;
                    box-sizing: border-box;
                    background-color: lighten($dark-blue, 3%);
                    box-shadow: $shadow;
                    border-radius: 0 0 5px 5px;
                    margin: 0 10px;
                    overflow: hidden;
                    i {
                        margin-top: 10px;
                        font-size: 4em;
                    }
                    p {
                        font-size: 1.1em;
                        color: rgba($white, 0.85);
                        text-align: center;
                        -webkit-hyphens: auto;
                    }
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
                    transition: color 0.3s;
                    &:hover {
                        color: rgba($white, 0.7);
                    }
                }
            }

            i {
                color: rgba($white, 0.7);
                transition: color 0.3s;
                &:hover {
                    cursor: pointer;
                    color: $white;
                }
            }
        }
    }
}
</style>
