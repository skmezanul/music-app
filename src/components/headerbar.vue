<template>
<header class="header">
  <div class="header-inner">
    <div class="top left">
      <i class="material-icons" @click="goBack">keyboard_arrow_left</i>
      <i class="material-icons" @click="goForward">keyboard_arrow_right</i>
    </div>
    <div class="top center" :class="{ 'search-active': searchQuery.length > 0 }">
      <i class="material-icons search-icon">search</i>
      <input type="text" v-model="searchQuery" placeholder="Search" />

      <!--Search Dropdown-->
      <transition name="fade">
        <div class="search-dropdown" v-if="searchQuery.length > 0">
          <i class="material-icons">search</i>
          <p>No results found for "{{ searchQuery }}".</p>
        </div>
      </transition>

    </div>
    <div class="top right">
      <img src="/static/images/avatar.jpg" alt="Avatar" class="user-avatar mobile-hidden" />
      <a href="" class="user-name mobile-hidden">Leon S.</a>
      <i class="toggle material-icons" @click="userDropdown = !userDropdown">keyboard_arrow_down</i>

      <!--User Dropdown-->
      <transition name="fade">
        <ul class="dropdown" v-if="userDropdown">
          <li>My Account</li>
          <li>Settings</li>
          <li>Logout</li>
        </ul>
      </transition>

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
                    border-radius: 3px;
                    transition: background-color 0.2s, box-shadow 0.2s;
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
                    width: 100%;
                    left: 0;
                    right: 0;
                    z-index: 999;
                    display: flex;
                    align-items: center;
                    justify-content: space-around;
                    flex-direction: column;
                    height: 170px;
                    padding: 15px;
                    box-sizing: border-box;
                    border: 1px solid $border-color;
                    background-color: lighten($dark-blue, 5%);
                    border-radius: 0 0 5px 5px;
                    overflow: hidden;
                    i {
                        margin-top: 10px;
                        font-size: 4em;
                    }
                    p {
                        text-align: center;
                        font-weight: 300;
                        text-transform: uppercase;
                        -webkit-hyphens: auto;
                        hyphens: auto;
                        color: rgba($white, 0.7);
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
                transition: color 0.2s;
                &:hover {
                    cursor: pointer;
                    color: $white;
                }
            }
        }
    }
}
</style>
