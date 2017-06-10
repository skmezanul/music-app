<template>
<div class="top-bar">
  <div class="top left">
    <i class="toggle material-icons" @click.native="sidenav = !sidenav">menu</i>
    <div v-if="scrollPosition < 300" class="branding mobile-hidden">Music App</div>
    <div v-else class="branding mobile-hidden">Ellie Goulding</div>
  </div>
  <div class="top center">
    <i class="material-icons search-icon">search</i>
    <input type="text" placeholder="Search" />
  </div>
  <div class="top right">
    <img class="user-image" src="/static/images/avatar.jpg" />
    <div class="user-name mobile-hidden">Leon Seipp</div>
    <i class="toggle material-icons" v-on:click="dropdown = !dropdown">keyboard_arrow_down</i>
    <transition name="fade">
      <div class="dropdown user" v-if="dropdown" v-on-clickaway="closeDropdown">
        <div class="dropdown-item"><i class="material-icons">account_circle</i> My Account</div>
        <div class="dropdown-item"><i class="material-icons">power_settings_new</i> Logout</div>
      </div>
    </transition>
  </div>
</div>
</template>

<script>
export default {
  data() {
    return {
      sidenav: false,
      dropdown: false
    }
  }
}
</script>

<style lang="scss">
.top-bar {
    display: flex;
    align-items: center;
    justify-content: space-between;
    position: fixed;
    border-bottom: 1px solid;
    border-color: transparent;
    background-color: var(--top-bg-color);
    top: 0;
    right: 0;
    left: 0;
    padding: 10px 20px;
    box-sizing: border-box;
    height: 65px;
    z-index: 999;
    transition: all 0.3s ease;
    .top {
        display: flex;
        align-items: center;
        &.left {
            .branding {
                font-size: 1.4em;
                padding-left: 20px;
            }
        }
        &.center {
            position: relative;
            input {
                border: none;
                padding: 12px 12px 12px 50px;
                width: 100%;
                background-color: rgba(255,255,255,0.1);
                z-index: 1;
                color: var(--white);
                border-radius: 3px;
                transition: all 0.3s ease;
                letter-spacing: 1px;
                &::selection {
                    background-color: var(--dark-blue-transparent);
                }
                &::-webkit-input-placeholder {
                    color: rgba(255,255,255,0.5);
                }
                &:focus {
                    outline: 0;
                    background-color: rgba(255,255,255,0.2);
                    box-shadow: 0 10px 20px var(--shadow-color);
                    &::-webkit-input-placeholder {
                        visibility: hidden;
                    }
                }
            }
            .search-icon {
                color: rgba(255, 255, 255, 0.5);
                z-index: 2;
                position: absolute;
                left: 15px;
            }
        }
        &.right {
            position: relative;
            .user-image {
                border-radius: 100%;
                height: 42px;
                width: 42px;
            }
            .user-name {
                padding: 0 10px;
            }
        }
        i {
            opacity: 0.7;
            transition: all 0.3s ease;
            &:hover {
                cursor: pointer;
                opacity: 1;
            }
        }
    }
}
.scrolled {
    .top-bar {
        background-color: var(--dark-blue);
        border-color: var(--border-color);
    }
}
@media screen and (min-width: 955px) {
    .top-bar {
        .top {
            &.left {
                justify-content: flex-start;
                width: 30%;
            }
            &.center {
                width: 40%;
            }
            &.right {
                justify-content: flex-end;
                width: 30%;
            }
        }
    }
}
@media screen and (max-width: 955px) {
    .top-bar {
        .top {
            &.center {
                width: 100%;
                margin: 0 15px;
            }
        }
    }
}
@supports (backdrop-filter: blur(5px)) or (-webkit-backdrop-filter: blur(5px)) {
    .scrolled .top-bar {
        background-color: var(--dark-blue-transparent);
        backdrop-filter: saturate(200%) blur(20px);
        -webkit-backdrop-filter: saturate(200%) blur(20px);
        overflow: hidden;
    }
}
</style>
