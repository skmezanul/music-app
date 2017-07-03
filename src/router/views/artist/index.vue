<template>
<main class="main-container" :class="{ 'compact-header': $route.meta.compactHeader === true }">
  <header class="header">
    <div class="background-container">
      <router-view name="headerbackground"></router-view>
    </div>
    <div class="header-inner">
      <router-view name="header"></router-view>
      <nav class="subnav mobile-hidden">
        <ul>
          <li>
            <router-link to="/artist/">Overview</router-link>
          </li>
          <li>
            <router-link to="/artist/concerts">Concerts</router-link>
          </li>
          <li>
            <router-link to="/artist/playlists">Playlists</router-link>
          </li>
          <li>
            <router-link to="/artist/feed">Artist Feed</router-link>
          </li>
          <li>
            <router-link to="/artist/similar">Similar Artists</router-link>
          </li>
          <li>
            <router-link to="/artist/information">Information</router-link>
          </li>
        </ul>
      </nav>
    </div>
  </header>
  <keep-alive>
    <router-view></router-view>
  </keep-alive>
</main>
</template>
<style lang="scss">
::-webkit-scrollbar {
    width: 0;
    height: 0;
}
body {
    font-family: 'Roboto', sans-serif;
    text-rendering: optimizeLegibility;
    letter-spacing: 1px;
    background-color: $main-bg-color;
    color: $white;
    min-width: 611px;
    user-select: none;
}
input {
    user-select: text;
}
ol,
ul {
    padding: 0;
    margin: 0;
    list-style: none;
}
h1,
h2,
h3,
h4 {
    margin: 0;
    font-weight: 400;
}
h1 {
    font-family: 'Open Sans', sans-serif;
    font-weight: 700;
}
h2 {
    font-size: 1.1em;
    letter-spacing: 1.7px;
    text-transform: uppercase;
    opacity: 0.7;
    span {
        &:after {
            content: ", ";
        }
        &:last-child:after {
            content: "";
        }
    }
}
a {
    &:active,
    &:link,
    &:visited {
        color: $white;
        text-decoration: none;
    }
}
.top-bar {
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
    .top-bar-inner {
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
                }
            }
            i {
                opacity: 0.7;
                transition: opacity 0.3s;
                &:hover {
                    cursor: pointer;
                    opacity: 1;
                }
            }
        }
    }
}
.main-container {
    padding-bottom: 81px;
    margin-top: 0;
    will-change: margin-top;
    transition: margin-top 0.3s;
    &.compact-header {
        margin-top: -250px;
        .header {
            .header-inner {
                .header-container {
                    h1 {
                        font-size: 4.4em;
                    }
                }
            }
        }
    }
}
.header {
    display: flex;
    position: relative;
    align-items: flex-end;
    justify-content: center;
    width: 100%;
    margin-bottom: 20px;
    padding-top: 65px;
    min-height: 400px;
    height: 550px;
    overflow: hidden;
    .background-container {
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        .Masthead {
            min-height: 100% !important;
            animation: zoomOut 0.3s 0.2s both;
        }
    }
    &:after {
        position: absolute;
        top: 0;
        right: 0;
        bottom: 0;
        left: 0;
        background: radial-gradient(circle, rgba($main-bg-color,0) 0%, $main-bg-color 90%), linear-gradient(rgba($main-bg-color,0) -30%, $main-bg-color);
        content: "";
    }
    .header-inner {
        display: flex;
        flex-direction: column;
        z-index: 996;
        .header-container {
            display: flex;
            flex-direction: column;
            animation: zoomOut 0.3s 0.2s both;
            h1 {
                margin-left: -7px;
                transition: font-size 0.3s;
                font-size: 5.5em;
            }
            .button-container {
                margin-top: 20px;
                display: flex;
                align-items: center;
                .button-group {
                    display: flex;
                    box-shadow: $shadow;
                    margin: 0 5px 10px 0;
                    a {
                        border-radius: 0;
                        margin: 0;
                        &:first-of-type {
                            border-top-left-radius: 5px;
                            border-bottom-left-radius: 5px;
                        }
                        &:nth-of-type(3) {
                            border-left: 1px solid $blue;
                        }
                        &:last-of-type {
                            border-top-right-radius: 5px;
                            border-bottom-right-radius: 5px;
                        }
                    }
                }
            }
        }
    }
}

nav {
    &.subnav {
        ul {
            display: flex;
            justify-content: space-between;
            margin-top: 35px;
            li {
                padding: 18px 0;
                font-size: 0.9em;
                letter-spacing: 1.7px;
                text-transform: uppercase;
                a {
                    &:not(.router-link-exact-active) {
                        opacity: 0.5;
                    }
                    &.router-link-exact-active:after {
                        display: block;
                        position: relative;
                        top: 1em;
                        width: 35px;
                        height: 3px;
                        margin: 0 auto;
                        background-color: $accent-color;
                        content: "";
                    }
                    &:not(.router-link-exact-active):hover {
                        cursor: pointer;
                        opacity: 0.7;
                    }
                }
            }
        }
    }
    &.sidenav {
        position: fixed;
        left: 0;
        top: 0;
        bottom: 0;
        z-index: 999;
        width: 200px;
        margin-bottom: 81px;
        ul {
            display: flex;
            flex-direction: column;
            padding-top: 50px;
            background-color: $dark-blue;
            border-right: 1px solid $border-color;
            height: 100%;
            box-sizing: border-box;
            .sidenav-section {
                margin: 15px;
                &:last-of-type {
                    border-top: 1px solid $border-color;
                    margin: auto 0 0;
                    li {
                        padding: 15px;
                    }
                }
                li {
                    display: flex;
                    align-items: center;
                    transition: background-color 0.5s;
                    white-space: nowrap;
                    overflow: hidden;
                    margin: 3px 0;
                    h4 {
                        text-transform: uppercase;
                        opacity: 0.7;
                        font-weight: 300;
                        font-size: 0.9em;
                        padding: 5px 10px;
                    }
                    a {
                        transition: opacity 0.3s;
                        opacity: 0.7;
                        font-size: 0.85em;
                        transition: opacity 0.3s, background-color 0.1s;
                        padding: 10px;
                        border-radius: 5px;
                        width: 100%;
                        display: flex;
                        align-items: center;
                        i {
                            font-size: 1.3em;
                            margin-right: 7px;
                        }
                        &.router-link-active {
                            background-color: $accent-color;
                            opacity: 1;
                        }
                        &:hover {
                            cursor: pointer;
                            opacity: 1;
                        }
                    }
                }
            }
        }
    }
}
.page-container {
    display: flex;
    flex-direction: column;
    align-items: center;
    animation: fadeIn 0.3s 0.2s both;
}

.page-section {
    display: flex;
    flex-direction: column;
    margin: 30px 0;
    .biography {
        font-weight: 300;
        line-height: 1.5em;
        opacity: 0.9;
        font-size: 1.1em;
        & p:nth-of-type(1) {
            margin-top: 0;
        }
    }
    .section-header {
        display: flex;
        align-items: center;
        justify-content: space-between;
        margin-bottom: 15px;
    }
    .section-title {
        font-size: 1.4em;
        font-weight: 300;
    }
    .section-actions {
        opacity: 0.7;
        transition: opacity 0.3s;
        &:hover {
            opacity: 1;
            cursor: pointer;
        }
    }
    .section-items-container {
        display: flex;
        flex-flow: row wrap;
        margin: 0 -5px;
        &.is-collapsed {
            @media screen and (max-width: 955px) {
                .section-item:nth-child(n+3) {
                    display: none;
                }
            }
            .section-item:nth-child(n+6) {
                display: none;
            }
        }
    }
}
.bottom-bar {
    display: flex;
    position: fixed;
    right: 0;
    bottom: 0;
    left: 0;
    align-items: center;
    padding: 15px 20px;
    background-color: $dark-blue;
    z-index: 999;
    border-top: 1px solid $border-color;
    .bottom {
        display: flex;
        align-items: center;
        height: 50px;
        &.left {
            flex: 1;
            justify-content: flex-start;
            img {
                height: 50px;
                width: 50px;
                margin-right: 10px;
                border-radius: 3px;
                box-shadow: $shadow;
            }
            .currently-playing {
                .title {
                    font-size: 1.2em;
                }
                .artist {
                    font-size: 0.9em;
                    font-weight: 300;
                    a {
                        opacity: 0.7;
                        transition: opacity 0.3s;
                        &:hover {
                            opacity: 1;
                            cursor: pointer;
                        }
                        &:after {
                            content: ", ";
                        }
                        &:last-child:after {
                            content: "";
                        }
                    }
                }
            }
        }
        &.right {
            flex: 1;
            justify-content: flex-end;
            i {
                padding-left: 20px;
            }
        }
        &.center {
            flex: 0.7;
            @media screen and (max-width: 955px) {
                flex: 1;
            }
            justify-content: space-between;
            .toggle {
                font-size: 3.3em;
                opacity: 1;
                &:hover {
                    transform: scale(1.15);
                }
            }
        }
        i {
            transition: opacity 0.3s;
            opacity: 0.7;
            &:hover {
                opacity: 1;
                cursor: pointer;
            }
        }
    }
}
.dropdown {
    position: absolute;
    width: 170px;
    top: 58px;
    right: 0;
    z-index: 999;
    box-shadow: $shadow;
    .dropdown-item {
        padding: 15px;
        transition: background-color 0.3s;
        background-color: $dark-blue;
        font-size: 0.9em;
        &:nth-of-type(1) {
            border-radius: 5px 5px 0 0;
        }
        &:nth-last-of-type(1) {
            border-radius: 0 0 5px 5px;
        }
        &:hover {
            background-color: $blue;
            cursor: pointer;
        }
    }
}
.btn {
    font-family: 'Open Sans', sans-serif;
    font-weight: 700;
    display: inline-flex;
    margin: 0 5px 10px 0;
    padding: 13px;
    border-radius: 3px;
    background-color: $light-blue;
    font-size: 0.9em !important;
    letter-spacing: 1.5px;
    text-transform: uppercase;
    transition: background-color 0.3s, color 0.3s;
    &:hover {
        cursor: pointer;
    }
    &:not(.btn-transparent):hover {
        background-color: $white;
        color: $black;
    }
    &:not(.btn-icon) {
        i {
            margin-right: 5px;
        }
    }
    i {
        font-size: 1em;
        line-height: inherit;
    }
    &.btn-accent {
        background-color: $accent-color;
    }
    &.btn-transparent {
        background-color: transparent;
        box-shadow: none;
    }
}
.tooltip-container {
    .tooltip {
        display: block !important;
        font-family: 'Roboto', sans-serif;
        letter-spacing: 1px;
        font-size: 0.9em;
        z-index: 10000;
        padding: 4px;
        .tooltip-inner {
            background: $dark-blue;
            border-radius: 3px;
            padding: 5px 7px;
        }
        &[aria-hidden='true'] {
            visibility: hidden;
            opacity: 0;
            transition: opacity 0.15s, visibility 0.15s;
        }

        &[aria-hidden='false'] {
            visibility: visible;
            opacity: 1;
            transition: opacity 0.15s;
        }
    }
}
.scrolled {
    .top-bar {
        background-color: $dark-blue;
        border-color: $border-color;
        .top-bar-inner {
            width: $small-width;
        }
    }
}

.main-container,
.top-bar {
    margin-left: 200px;
}
@media screen and (max-width: 955px) {
    .mobile-hidden {
        display: none !important;
    }
}
@keyframes fadeIn {
    from {
        opacity: 0;
    }
    to {
        opacity: 1;
    }
}
@keyframes zoomOut {
    0% {
        opacity: 0;
        transform: scale(1.05);
    }
    50% {
        opacity: 1;
    }
    100% {
        transform: scale(1);
    }
}
@keyframes fadeInBottom {
    from {
        transform: translateY(25px);
        opacity: 0;
    }
    to {
        transform: translateY(0);
        opacity: 1;
    }
}
.fade-enter-active,
.fade-leave-active {
    transition: opacity 0.3s;
    transition-delay: 0.1s;
}
.fade-enter,
.fade-leave-to {
    opacity: 0;
}
@supports (backdrop-filter: blur(20px)) or (-webkit-backdrop-filter: blur(20px)) {
    .bottom-bar,
    .scrolled .top-bar {
        background-color: $dark-blue-transparent;
        backdrop-filter: saturate(200%) blur(20px);
        -webkit-backdrop-filter: saturate(200%) blur(20px);
    }
}
.header-inner,
.page-section,
.top-bar-inner {
    width: $large-width;
    @media screen and (max-width: 1500px) {
        width: $small-width;
    }
}
</style>
