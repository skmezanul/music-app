<template lang="pug">
#app(
  :class='[$mq.all, $route.name]')

  // header
  ma-header

  // navigation
  ma-navigation(v-if='$mq.desktop || $mq.tablet')

  // router view
  router-view(:key='$route.path')

  // footer
  keep-alive
    transition(name='fade')
      ma-footer

  // tooltips
  .tooltip-container

  // loading spinner
  transition(name='fade', appear)
    ma-loading.loading-container(v-if='$isLoading("fetching data")')
      template(slot='spinner')
        ma-loader

  // notices
  transition-group(name='slide-down-transform', tag='notices')
    ma-notice(v-for='(notice, index) in notices', :key='index', :message='notice', @remove="removeNotice(index)")

  // music video
  ma-video
</template>

<script>
import { mapActions, mapGetters } from 'vuex';

export default {
  created() {
    // fetch the data when the view is created and the data is
    // already being observed
    this.GET_CURRENT_USER('profile');
    this.GET_CURRENT_USER('playlists');
    setInterval(() => {
      this.GET_CURRENT_PLAYBACK();
    }, 1000);
  },
  methods: {
    ...mapActions(['GET_CURRENT_USER', 'GET_CURRENT_PLAYBACK']),

    // remove notice
    removeNotice(index) {
      this.$store.commit('REMOVE_NOTICE', index);
    },
  },
  computed: {
    ...mapGetters({
      notices: 'getNotices',
    }),
  },
};
</script>

<style lang="scss">
/** Ultra Light */
@font-face {
    font-family: 'San Francisco';
    font-weight: 100;
    src: url('../static/fonts/sanfranciscodisplay-ultralight-webfont.woff');
}

/** Thin */
@font-face {
    font-family: 'San Francisco';
    font-weight: 200;
    src: url('../static/fonts/sanfranciscodisplay-thin-webfont.woff');
}

/** Regular */
@font-face {
    font-family: 'San Francisco';
    font-weight: 400;
    src: url('../static/fonts/sanfranciscodisplay-regular-webfont.woff');
}

/** Medium */
@font-face {
    font-family: 'San Francisco';
    font-weight: 500;
    src: url('../static/fonts/sanfranciscodisplay-medium-webfont.woff');
}

/** Semi Bold */
@font-face {
    font-family: 'San Francisco';
    font-weight: 600;
    src: url('../static/fonts/sanfranciscodisplay-semibold-webfont.woff');
}

/** Bold */
@font-face {
    font-family: 'San Francisco';
    font-weight: 700;
    src: url('../static/fonts/sanfranciscodisplay-bold-webfont.woff');
}

* {
    box-sizing: border-box;
}

body {
    min-width: 611px;
    background-color: $main-bg-color;
    color: $white;
    letter-spacing: 1px;
    font-family: $font-family;
    user-select: none;
}

input {
    user-select: text;
}

ol,
ul {
    margin: 0;
    padding: 0;
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
    font-weight: 700;
    letter-spacing: 2.5px;
}

h2 {
    color: rgba($white, 0.7);
    text-transform: uppercase;
    letter-spacing: 2px;
    font-size: 1.2em;
}

pre {
    overflow-x: auto;
}

a {
    &:active,
    &:link,
    &:visited {
        color: $white;
        text-decoration: none;
    }
}

// page-container containing stacked sections
.page-container {
    display: flex;
    flex-direction: column;
    align-items: center;
}

// dropdown styling
.dropdown {
    position: absolute;
    top: 58px;
    right: 0;
    z-index: 999;
    overflow: hidden;
    width: 150px;
    border-radius: 5px;
    background-color: $dark-blue;

    li {
        padding: 15px;
        font-size: 0.9em;
        transition: background-color 0.3s;
        &:hover {
            background-color: $blue;
            cursor: pointer;
        }
    }
}

// tooltip styling
.tooltip-container {
    .tooltip {
        z-index: 999;
        display: block !important;
        letter-spacing: 1.5px;
        font-family: $font-family;
        transition: opacity 0.3s, visibility 0.3s;
        margin-bottom: 12px;

        .tooltip-inner {
            padding: 7px 10px;
            border-radius: 3px;
            background: $accent-color;
            &:after {
                content: "";
                position: absolute;
                top: 100%;
                left: calc(50% - 8px);
                border: 8px solid;
                border-color: $accent-color transparent transparent transparent;
            }
        }

        &[aria-hidden='true'] {
            visibility: hidden;
            opacity: 0;
        }

        &[aria-hidden='false'] {
            visibility: visible;
            opacity: 1;
        }
    }
}

// spacing for navigation sidebar
@media (min-width: $breakpoint-mobile) {
    .loader-container,
    .main-container,
    .notice-container,
    header {
        margin-left: 200px;
    }
}

// width of page elements
.header-container,
.notice-inner,
.page-section,
.stage-inner {
    max-width: 1440px;
    width: $large-width;
    @media (max-width: 1440px) {
        width: $small-width;
    }
}

// fade transition
.fade-enter-active,
.fade-leave-active {
    transition: opacity 0.3s;
}

.fade-enter,
.fade-leave-to {
    opacity: 0;
}

// slide down transition with transform (notices)
.slide-down-transform-enter-active,
.slide-down-transform-leave-active {
    transition: transform 0.3s;
}

.slide-down-transform-enter {
    transform: translateY(-100%);
}
.slide-down-transform-leave-to {
    transform: translateY(-100%);
}

// slide up transition with margin (cover)
.slide-up-margin-enter-active,
.slide-up-margin-leave-active {
    transition: margin 0.3s;
}

.slide-up-margin-enter {
    margin-bottom: -199px;
}
.slide-up-margin-leave-to {
    margin-bottom: -199px;
}

// zoom out animation (stage background)
.zoom-out-enter-active {
    animation: zoomOut 1s both;
}
.zoom-out-leave-active {
    animation: zoomOut 1s both reverse;
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

// enable backdrop-filter in supported browsers
@supports (backdrop-filter: blur(20px)) or (-webkit-backdrop-filter: blur(20px)) {
    .scrolled header,
    footer {
        background-color: rgba($dark-blue, 0.8) !important;
        -webkit-backdrop-filter: saturate(200%) blur(20px);
        backdrop-filter: saturate(200%) blur(20px);
    }
}
</style>
