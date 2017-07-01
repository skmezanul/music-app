<template>
<main class="main-container" :class="{ 'compact': $route.meta.compactHeader === true }">
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
:root {
    --accent-color: #ca2a59;
    --accent-color-dark: #a72c50;
    --blue: #282a3c;
    --light-blue: #2d364c;
    --dark-blue: #0c101b;
    --dark-blue-transparent: rgba(12, 16, 27, 0.7);
    --border-color: rgba(255, 255, 255, 0.1);
    --top-bg-color: rgba(12, 16, 27, 0.2);
    --inner-width: 75%;
    @media screen and (max-width: 1500px) {
        --inner-width: 95%;
    }
    --main-bg-color: #1A1D2C;
    --shadow-color: rgba(0, 0, 0, 0.2);
}
::-webkit-scrollbar {
    width: 0;
    height: 0;
}
body {
    font-family: 'Roboto', sans-serif;
    letter-spacing: 1px;
    background-color: var(--main-bg-color);
    color: #fff;
    -webkit-user-select: none;
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
        color: #fff;
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
        width: var(--inner-width);
        transition: width 0.3s;
        will-change: width;
        .top {
            display: flex;
            align-items: center;
            height: 42px;
            &.left {
                @media screen and (min-width: 955px) {
                    justify-content: flex-start;
                    flex: 1;
                }
                .branding {
                    font-size: 1.4em;
                }
            }
            &.center {
                position: relative;
                @media screen and (max-width: 955px) {
                    width: 100%;
                    margin-right: 10px;
                }
                @media screen and (min-width: 955px) {
                    flex: 1.5;
                }
                input {
                    border: none;
                    padding: 12px 12px 12px 50px;
                    width: 100%;
                    background-color: rgba(255,255,255,0.1);
                    z-index: 1;
                    color: #fff;
                    border-radius: 3px;
                    transition: background-color 0.3s;
                    letter-spacing: 1.3px;
                    -webkit-user-select: text;
                    &::-webkit-input-placeholder {
                        color: rgba(255,255,255,0.4);
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
    &.compact {
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
        background: radial-gradient(circle, rgba(26,29,44,0) 0%, var(--main-bg-color) 90%), linear-gradient(rgba(26,29,44,0) -30%, var(--main-bg-color));
        content: "";
    }
    .header-inner {
        display: flex;
        flex-direction: column;
        width: var(--inner-width);
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
                    box-shadow: 0 5px 10px var(--shadow-color);
                    margin: 0 5px 10px 0;
                    a {
                        border-radius: 0;
                        margin: 0;
                        &:first-of-type {
                            border-top-left-radius: 5px;
                            border-bottom-left-radius: 5px;
                        }
                        &:nth-of-type(3) {
                            border-left: 1px solid var(--blue);
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
                        background-color: var(--accent-color);
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
            background-color: var(--dark-blue);
            border-right: 1px solid var(--border-color);
            height: 100%;
            box-sizing: border-box;
            .sidenav-section {
                padding-bottom: 25px;
                &:last-of-type {
                    border-top: 1px solid var(--border-color);
                    margin-top: auto;
                    padding-bottom: 0;
                    li {
                        padding: 20px 0;
                    }
                }
                li {
                    display: flex;
                    align-items: center;
                    transition: background-color 0.5s;
                    padding: 7px 0;
                    h4 {
                        padding-left: 30px;
                        text-transform: uppercase;
                        opacity: 0.7;
                        font-weight: 300;
                    }
                    a {
                        transition: opacity 0.3s;
                        border-left: 4px solid;
                        border-color: transparent;
                        font-size: 0.9em;
                        padding: 3px 0 3px 30px;
                        opacity: 0.7;
                        transition: opacity 0.3s;
                        &.active {
                            border-color: var(--accent-color);
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
    width: var(--inner-width);
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
            .section-item:nth-child(n+5) {
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
    background-color: var(--dark-blue);
    z-index: 999;
    border-top: 1px solid var(--border-color);
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
                box-shadow: 0 3px 3px var(--shadow-color);
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
    box-shadow: 0 10px 30px var(--shadow-color);
    .dropdown-item {
        padding: 15px;
        transition: background-color 0.3s;
        background-color: var(--dark-blue);
        font-size: 0.9em;
        &:nth-of-type(1) {
            border-radius: 5px 5px 0 0;
        }
        &:nth-last-of-type(1) {
            border-radius: 0 0 5px 5px;
        }
        &:hover {
            background-color: var(--blue);
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
    background-color: var(--light-blue);
    font-size: 0.9em !important;
    letter-spacing: 1.5px;
    text-transform: uppercase;
    transition: background-color 0.3s, color 0.3s;
    &:hover {
        cursor: pointer;
    }
    &:not(.btn-transparent):hover {
        background-color: #fff;
        color: #000;
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
        background-color: var(--accent-color);
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
            background: var(--dark-blue);
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
        background-color: var(--dark-blue);
        border-color: var(--border-color);
        .top-bar-inner {
            width: 95%;
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
@supports (backdrop-filter: blur(20px)) or (-webkit-backdrop-filter: blur(20px)) {
    .bottom-bar,
    .scrolled .top-bar {
        background-color: var(--dark-blue-transparent);
        backdrop-filter: saturate(200%) blur(20px);
        -webkit-backdrop-filter: saturate(200%) blur(20px);
        overflow: hidden;
    }
}
</style>
