<template>
  <header class="header">
    <div class="header-inner">
      <div class="top left">
        <i class="material-icons" @click="goBack">keyboard_arrow_left</i>
        <i class="material-icons" @click="goForward">keyboard_arrow_right</i>
      </div>
      <div class="top center">
        <i class="material-icons search-icon">search</i>
        <input type="text" placeholder="Search" />
      </div>
      <div class="top right">
        <img src="/static/images/avatar.jpg" alt="Avatar" class="user-avatar mobile-hidden" />
        <a href="" class="user-name mobile-hidden">Leon S.</a>
        <i class="toggle material-icons" @click="userDropdown = !userDropdown">keyboard_arrow_down</i>
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
      userDropdown: false
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
                    transition: background-color 0.3s, box-shadow 0.3s;
                    letter-spacing: 1.3px;
                    margin: 0 10px;

                    &::-webkit-input-placeholder {
                        color: rgba($white,0.4);
                    }
                    &:focus {
                        outline: 0;
                        background-color: rgba($white,0.2);
                        box-shadow: $shadow;

                        &::-webkit-input-placeholder {
                            visibility: hidden;
                        }
                    }
                }

                .search-icon {
                    color: rgba($white, 0.5);
                    position: absolute;
                    left: 25px;
                    top: 9px;
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
