<template>
<div id="app" :class="{scrolled: scrollPosition > 0}">

  <!-- Header -->
  <headerbar></headerbar>

  <!-- Sidenav -->
  <sidenav></sidenav>

  <!-- Router View -->
  <router-view :key="$route.params.id"></router-view>

  <!-- Footer -->
  <transition name="fade">
    <footerbar></footerbar>
  </transition>

  <div class="tooltip-container">

    <!--Insert Tooltips-->

  </div>

</div>
</template>

<script>
import spotifyApi from './api/'

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
  created() {
    // Get the current user's profile
    spotifyApi.getMe()
      .then(response => this.$store.commit('currentUser', response))
    // Get the current device's ID
    spotifyApi.getMyDevices()
      .then(response => this.$store.commit('deviceID', response.devices[0].id))
  },
  mounted() {
    window.addEventListener('scroll', this.updateScroll)
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
    font-family: 'Ubuntu', sans-serif;
    font-weight: 700;
    letter-spacing: 3px;
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
}

.page-container {
    display: flex;
    flex-direction: column;
    align-items: center;
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
        margin: 0;
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
    font-family: 'Ubuntu', sans-serif;
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
.main-container {
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
        transform: scale(1.1);
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
    .header .search-active input,
    .header .search-dropdown,
    .scrolled .header {
        background-color: rgba($dark-blue, 0.7) !important;
        backdrop-filter: saturate(200%) blur(20px);
        -webkit-backdrop-filter: saturate(200%) blur(20px);
    }
}

.header-inner,
.page-section,
.stage-inner {
    width: $large-width;
    @media screen and (max-width: 1500px) {
        width: $small-width;
    }
}
</style>
