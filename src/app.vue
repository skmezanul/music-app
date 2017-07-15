<template>
<div id="app" :class="{scrolled: scrollPosition > 0}">

  <!-- Header -->
  <headerbar></headerbar>

  <!-- Sidenav -->
  <nav class="sidenav">
    <ul>
      <div class="sidenav-section top">
        <li>
          <router-link to="/artist/Ellie%20Goulding"><i class="material-icons">book</i>Browse</router-link>
        </li>
        <li>
          <router-link to="/radio"><i class="material-icons">radio</i>Radio</router-link>
        </li>
      </div>
      <div class="sidenav-section yourmusic">
        <li>
          <h4>Your Music</h4></li>
        <li>
          <router-link to="/lastheard"><i class="material-icons">history</i>Last heard</router-link>
        </li>
        <li>
          <router-link to="/songs"><i class="material-icons">music_note</i>Songs</router-link>
        </li>
        <li>
          <router-link to="/albums"><i class="material-icons">album</i>Albums</router-link>
        </li>
        <li>
          <router-link to="/artists"><i class="material-icons">person</i>Artists</router-link>
        </li>
      </div>
      <div class="sidenav-section playlists">
        <li>
          <h4>Playlists</h4></li>
        <li><a><i class="material-icons">favorite</i>Favorites</a></li>
        <li><a><i class="material-icons">playlist_play</i>Mix of the week</a></li>
        <li><a><i class="material-icons">playlist_play</i>Good music</a></li>
        <li><a><i class="material-icons">playlist_play</i>Hits Remixed</a></li>
      </div>
      <div class="sidenav-section bottom">
        <li><a><i class="material-icons">playlist_add</i>New Playlist</a></li>
      </div>
    </ul>
  </nav>

  <!-- Router View -->
  <router-view></router-view>

  <!-- Footer -->
  <footerbar></footerbar>

  <div class="tooltip-container">

    <!--Insert Tooltips-->

  </div>

</div>
</template>

<script>
export default {
  data() {
    return {
      scrollPosition: null
    }
  },
  methods: {
    updateScroll() {
      this.scrollPosition = window.scrollY
    }
  },
  mounted() {
    window.addEventListener('scroll', this.updateScroll);
  },
  destroy() {
    window.removeEventListener('scroll', this.updateScroll)
  }
};
</script>

<style lang="scss">
body {
    font-family: 'Roboto', sans-serif;
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
    font-size: 1.2em;
    letter-spacing: 1.7px;
    text-transform: uppercase;
    color: rgba($white, 0.7);
}

a {
    &:active,
    &:link,
    &:visited {
        color: $white;
        text-decoration: none;
    }
}

.main-container {
    padding-bottom: 81px;
    margin-top: 0;
    will-change: margin-top;
    transition: margin-top 0.3s;

    &.stage-compact {
        margin-top: -250px;

        .stage {
            .stage-inner {
                .stage-container {
                    h1 {
                        font-size: 4.4em;
                    }
                }
            }
        }
    }
}

.stage {
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

    .stage-background {
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;

        .Masthead {
            min-height: 100% !important;

            img {
                animation: zoomOut 0.3s 0.2s both;
            }
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

    .stage-inner {
        display: flex;
        flex-direction: column;
        z-index: 996;

        .stage-container {
            display: flex;
            flex-direction: column;
            animation: zoomOut 0.3s 0.2s both;

            h1 {
                margin-left: -7px;
                transition: font-size 0.3s;
                font-size: 5em;
            }
            .genres {
                a {
                    text-transform: uppercase;
                    @include comma-separated(1.2em, 400);
                }
            }
            .button-container {
                margin-top: 15px;
                display: flex;
                align-items: center;

                .button-group {
                    display: flex;
                    box-shadow: $shadow;
                    margin: 0 5px 10px 0;
                    border-radius: 5px;
                    overflow: hidden;

                    a {
                        border-radius: 0;
                        margin: 0;
                        &:nth-child(3) {
                            border-left: 1px solid $blue;
                        }
                    }
                }
            }
        }
    }
}

nav {
    &.subnav {
        margin-top: 30px;
        padding-top: 5px;

        &.above-viewport {
            position: fixed;
            top: 69px;
            left: 0;
            right: 0;
            z-index: 999;
            margin-top: 0;
            display: flex;
            justify-content: center;
            background-color: $dark-blue;
            border-bottom: 1px solid $border-color;
        }

        ul {
            display: flex;
            justify-content: space-between;

            li {
                padding: 15px 0;
                a {
                    font-size: 0.9em;
                    letter-spacing: 1.7px;
                    line-height: 1em;
                    text-transform: uppercase;
                    transition: color 0.3s;
                    color: rgba($white, 0.5);

                    &.router-link-exact-active {
                        color: $white;
                        &:after {
                            display: block;
                            position: relative;
                            top: 1em;
                            width: 40px;
                            height: 3px;
                            margin: 0 auto;
                            background-color: $accent-color;
                            content: "";
                        }
                    }
                    &:not(.router-link-exact-active):hover {
                        cursor: pointer;
                        color: rgba($white, 0.7);
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

                &.bottom {
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

                    h4 {
                        text-transform: uppercase;
                        color: rgba($white, 0.7);
                        font-weight: 300;
                        font-size: 0.9em;
                        padding: 5px 10px;
                    }

                    a {
                        font-size: 0.85em;
                        transition: background-color 0.1s;
                        padding: 10px;
                        border-radius: 5px;
                        width: 100%;
                        display: flex;
                        align-items: center;
                        @include item-hover;

                        i {
                            font-size: 1.3em;
                            margin-right: 7px;
                        }

                        &.router-link-active {
                            background-color: $accent-color;
                            color: $white;
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
        color: rgba($white, 0.9);
        font-size: 1.1em;
        & p:nth-of-type(1) {
            margin-top: 0;
        }
    }

    .section-header {
        display: flex;
        align-items: center;
        justify-content: space-between;
        margin-bottom: 20px;
        .section-actions {
            span {
                display: flex;
                align-items: center;
                @include item-hover;
            }
        }
    }

    .section-items-container {
        display: flex;
        flex-flow: row wrap;
        margin: 0 -7px;

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

.dropdown {
    position: absolute;
    width: 150px;
    top: 58px;
    right: 0;
    z-index: 999;
    border-radius: 5px;
    overflow: hidden;
    background-color: $dark-blue;

    li {
        padding: 15px;
        transition: background-color 0.3s;
        font-size: 0.9em;
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
    .header {
        background-color: $dark-blue;
        border-color: $border-color;

        .header-inner {
            width: $small-width;
        }
    }
}
.header,
.main-container,
.subnav.above-viewport {
    margin-left: 200px;
}
@media screen and (max-width: 955px) {
    .mobile-hidden {
        display: none !important;
    }
}

.fade-enter-active,
.fade-leave-active {
    transition: opacity 0.2s;
}

.fade-enter,
.fade-leave-to {
    opacity: 0;
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
    .footer,
    .header .search-dropdown,
    .header .search-active input,
    .scrolled .header,
    .subnav.above-viewport {
        background-color: rgba($dark-blue, 0.7) !important;
        backdrop-filter: saturate(200%) blur(20px);
        -webkit-backdrop-filter: saturate(200%) blur(20px);
    }
}

.header-inner,
.page-section,
.stage-inner,
.subnav.above-viewport ul {
    width: $large-width;
    @media screen and (max-width: 1500px) {
        width: $small-width;
    }
}
</style>
