<template>
<div class="main-container">
  <header class="header" :class="{ 'compact': $route.meta.compactHeader === true }">
    <div class="background-container">
      <router-view name="headerbackground"></router-view>
    </div>
    <div class="header-inner">
      <router-view name="header"></router-view>
      <nav class="subnav mobile-hidden">
        <router-link to="/artist/" class="nav-item">Overview</router-link>
        <router-link to="/artist/information" class="nav-item">Information</router-link>
        <router-link to="/artist/concerts" class="nav-item">Concerts</router-link>
        <router-link to="/artist/playlists" class="nav-item">Playlists</router-link>
        <router-link to="/artist/feed" class="nav-item">Artist Feed</router-link>
        <router-link to="/artist/similar" class="nav-item">Similar Artists</router-link>
      </nav>
    </div>
  </header>
  <router-view></router-view>
</div>
</template>
<style lang="scss">
:root {
    --black: #000;
    --white: #fff;
    --accent-color: #ca2a59;
    --accent-color-dark: #a72c50;
    --blue: #282a3c;
    --light-blue: #2d364c;
    --dark-blue: #0c101b;
    --dark-blue-transparent: rgba(12, 16, 27, 0.7);
    --border-color: rgba(255, 255, 255, 0.1);
    --top-bg-color: rgba(12, 16, 27, 0.2);
    --inner-width: 60%;
    --main-bg-color: #1A1D2C;
    --font-color: #fff;
    --shadow-color: rgba(0, 0, 0, 0.2);
    --scrollbar: #fff;
}
::selection {
    background-color: transparent;
}
::-webkit-scrollbar {
    width: 3px;
    height: 3px;
    &-track {
        background-color: var(--dark-blue);
    }
    &-thumb {
        background-color: var(--scrollbar);
    }
}
body {
    font-family: 'Roboto', sans-serif;
    letter-spacing: 1px;
    background-color: var(--main-bg-color);
    color: var(--font-color);
    a {
        &:active,
        &:link,
        &:visited {
            color: var(--font-color);
            text-decoration: none;
        }
    }
}

.scrolled {
    .app-bar {
        background-color: var(--dark-blue);
        border-color: var(--border-color);
    }
}
.app-bar {
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: space-between;
    position: absolute;
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
    position: fixed;
    .top {
        display: flex;
        align-items: center;
        &.left {
            width: 30%;
            justify-content: flex-start;
            .branding {
                font-size: 1.4em;
                padding-left: 20px;
            }
        }
        &.center {
            position: relative;
            margin: 0 15px;
            width: 40%;
            input {
                border: none;
                padding: 12px 15px 12px 50px;
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
            width: 30%;
            justify-content: flex-end;
            .user-image {
                border-radius: 100%;
                height: 42px;
                width: 42px;
            }
            .user-name {
                padding: 0 10px;
            }
            .toggle {
                opacity: 0.8;
                transition: all 0.3s ease;
                &:hover {
                    cursor: pointer;
                    opacity: 1;
                }
            }
        }
    }
}
.main-container {
    margin-left: 230px;
    box-sizing: border-box;
    padding-bottom: 83px;
    animation: fadein 0.3s 0.2s both;
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
    transition: all 0.3s ease;
    &.compact {
        min-height: 250px;
        height: 250px;
        .header-inner {
            .subnav {
                margin-top: 25px;
            }
            .header-container {
                height: 130px !important;
                .header-image {
                    min-width: 130px;
                    width: 130px;
                    height: 130px;
                }
            }
        }
    }
    .background-container {
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        .Masthead {
            min-height: 100% !important;
            animation: zoomout 0.3s 0.2s both;
        }
    }
    &:after {
        position: absolute;
        top: 0;
        right: 0;
        bottom: 0;
        left: 0;
        background: radial-gradient(circle, transparent 0%, var(--main-bg-color) 90%), linear-gradient(transparent -30%, var(--main-bg-color));
        content: "";
    }
    .header-inner {
        display: flex;
        flex-direction: column;
        width: var(--inner-width);
        z-index: 996;
        .header-container {
            display: flex;
            align-items: center;
            height: 246px;
            animation: zoomout 0.3s 0.2s both;
            .header-image {
                min-width: 230px;
                width: 230px;
                height: 230px;
                margin-right: 25px;
                border-radius: 50%;
                overflow: hidden;
                display: flex;
                align-items: center;
                justify-content: center;
                img {
                    width: 260%;
                }
            }
            .header-content {
                .headline {
                    margin-left: -4px;
                    font-family: 'Open Sans', sans-serif;
                    font-size: 3.75em;
                    font-weight: 700;
                }
                .subline {
                    font-size: 1.05em;
                    letter-spacing: 1.7px;
                    text-transform: uppercase;
                    &.transparent {
                        opacity: 0.7;
                    }
                }
                .description {
                    margin-top: 20px;
                    font-weight: 300;
                    line-height: 1.4em;
                    opacity: 0.8;
                }
                .header-buttons {
                    margin-top: 20px;
                }
            }
        }
    }
}
@media screen and (max-width: 1000px) {
    .header-image {
        display: none !important;
    }
}

nav {
    display: flex;
    &.subnav {
        justify-content: space-between;
        margin-top: 35px;
        .nav-item {
            padding-top: 20px;
            padding-bottom: 18px;
            font-size: 0.9em;
            letter-spacing: 1.7px;
            text-transform: uppercase;
            transition: all 0.3s ease;
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
            &:not(.router-link-exact-active) {
                opacity: 0.5;
            }
        }
    }
    &.sidenav {
        display: flex;
        flex-direction: column;
        z-index: 997;
        width: 230px;
        height: 100%;
        padding-top: 65px;
        position: fixed;
        .nav-item {
            display: flex;
            align-items: center;
            padding: 20px;
            border-bottom: 1px solid var(--border-color);
            transition: all 0.5s ease;
            &.bottom {
                border-top: 1px solid var(--border-color);
                margin-top: auto;
            }
            &:hover {
                cursor: pointer;
                background-color: rgba(255,255,255,0.1);
            }
            &.active {
                background-color: var(--accent-color);
            }
            i {
                margin-right: 10px;
            }
        }
    }
}
.page-container {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    width: 100%;
    animation: fadein 0.3s 0.2s both;
}

.page-section {
    display: flex;
    flex-direction: column;
    width: var(--inner-width);
    margin: 30px 0;
    .biography {
        font-weight: 300;
        line-height: 1.4em;
        opacity: 0.9;
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
        transition: all 0.3s;
        &:hover {
            opacity: 1;
            cursor: pointer;
        }
    }
    .section-items-container {
        display: flex;
        flex-flow: row wrap;
    }
}
.playback-controls {
    display: flex;
    position: fixed;
    right: 0;
    bottom: 0;
    left: 0;
    align-items: center;
    box-sizing: border-box;
    padding: 15px 20px;
    background-color: var(--dark-blue);
    z-index: 998;
    border-top: 1px solid var(--border-color);
    .controls {
        display: flex;
        align-items: center;
        height: 50px;
        &.left {
            width: 40%;
            justify-content: flex-start;
            .album-cover {
                height: 50px;
                width: 50px;
                padding-right: 10px;
                border-radius: 3px;
                box-shadow: 0 3px 3px var(--shadow-color);
            }
            .currently-playing {
                .title {
                    font-size: 1.2em;
                }
                .artist {
                    opacity: 0.7;
                    font-size: 0.9em;
                    font-weight: 300;
                }
            }
        }
        &.right {
            width: 40%;
            justify-content: flex-end;
            i {
                padding-left: 20px;
            }
        }
        &.center {
            width: 20%;
            justify-content: space-between;
            .play {
                font-size: 3.3em;
                opacity: 1;
                &:hover {
                    transform: scale(1.15);
                }
            }
        }
        i {
            transition: all 0.3s ease;
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
    width: 184px;
    top: 58px;
    right: 0;
    z-index: 999;
    .dropdown-item {
        padding: 15px;
        display: flex;
        align-items: center;
        transition: all 0.3s ease;
        background-color: var(--dark-blue);
        font-size: 0.9em;
        &:nth-of-type(1) {
            border-radius: 5px 5px 0 0;
        }
        &:nth-last-of-type(1) {
            border-radius: 0 0 5px 5px;
        }
        &:hover {
            background-color: var(--light-blue);
            cursor: pointer;
        }
        i {
            margin-right: 10px;
        }
    }
}
.btn {
    display: inline-flex;
    margin-right: 5px;
    margin-bottom: 10px;
    padding: 13px;
    border-radius: 3px;
    background-color: var(--light-blue);
    font-size: 0.9em !important;
    letter-spacing: 2px;
    text-transform: uppercase;
    transition: all 0.3s ease;
    &:hover {
        cursor: pointer;
    }
    &:not(.btn-transparent) {
        color: var(--white);
        &:hover {
            background-color: var(--white);
            color: var(--black);
            box-shadow: 0 5px 20px var(--shadow-color);
        }
    }
    i {
        margin-right: 5px;
        font-size: 1em;
        line-height: inherit;
    }
    &.btn-icon i {
        margin-right: 0;
    }
    &.btn-accent {
        background-color: var(--accent-color);
    }
    &.btn-transparent {
        background-color: transparent;
        box-shadow: none;
        i {
            color: var(--accent-color);
        }
    }
}
@media screen and (max-width: 1700px) {
    :root {
        --inner-width: 80%;
    }
}
@media screen and (max-width: 1400px) {
    :root {
        --inner-width: 95%;
    }
    .sidenav {
        background-color: var(--dark-blue);
        border-right: 1px solid var(--border-color);
    }
}
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
@media screen and (max-width: 955px) {
    .mobile-hidden {
        display: none !important;
    }
    .app-bar {
        .top {
            &.center {
                width: 100%;
                margin: 0;
            }
        }
    }
    .main-container {
        margin-left: 0;
    }
    .section-item {
        flex: 1;
    }
    .playback-controls {
        .controls {
            &.center {
                width: 100%;
            }
        }
    }
}
@keyframes fadein {
    from {
        opacity: 0;
    }
    to {
        opacity: 1;
    }
}
@keyframes zoomout {
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
.fade-enter-active,
.fade-leave-active {
    transition: opacity 0.1s;
}

.fade-enter,
.fade-leave-to {
    opacity: 0;
}
@supports (backdrop-filter: blur(5px)) or (-webkit-backdrop-filter: blur(5px)) {
    .playback-controls,
    .scrolled .app-bar {
        background-color: var(--dark-blue-transparent);
        backdrop-filter: saturate(200%) blur(20px);
        -webkit-backdrop-filter: saturate(200%) blur(20px);
        overflow: hidden;
    }
}
</style>
