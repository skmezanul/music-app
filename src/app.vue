<template lang="pug">
#app(:class='{ "scrolled" : scrollPosition > 0 }')

	// header
	ma-header

	// navigation
	ma-navigation.mobile-hidden

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
	transition-group(name='slide', tag='notices')
		ma-notice(v-for='(notice, index) in $store.state.notices', :key='index', :message='notice', @remove="removeNotice(index)")
</template>

<script>
import {
  mapActions
} from 'vuex';

export default {
  data() {
    return {
      scrollPosition: null,
    }
  },
  created() {
    // fetch the data when the view is created and the data is
    // already being observed
    this.GET_CURRENT_USER();
    this.GET_MY_DEVICES();
  },
  methods: {
    ...mapActions(['GET_CURRENT_USER', 'GET_MY_DEVICES']),

    // remove notice
    removeNotice(index) {
      this.$store.commit('REMOVE_NOTICE', index);
    },

    // update scroll position
    updateScroll() {
      this.scrollPosition = window.scrollY;
    },
  },
  mounted() {
    window.addEventListener('scroll', this.updateScroll, {
      passive: true,
    });
  },
  destroy() {
    window.removeEventListener('scroll', this.updateScroll, {
      passive: true,
    });
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

a {
    &:active,
    &:link,
    &:visited {
        color: $white;
        text-decoration: none;
    }
}

.page-container {
    display: flex;
    flex-direction: column;
    align-items: center;
}

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

.scrolled {
    header {
        border-color: $border-color;
        background-color: $dark-blue;

        .header-container {
            width: $small-width;
        }
    }
}
@media (min-width: $breakpoint-mobile) {
    .loader-container,
    .main-container,
    .notice-container,
    header {
        margin-left: 200px;
    }
}
@media (max-width: $breakpoint-mobile) {
    .mobile-hidden {
        display: none !important;
    }
}

.fade-enter-active,
.fade-leave-active {
    transition: opacity 0.3s;
}

.fade-enter,
.fade-leave-to {
    opacity: 0;
}

.slide-enter-active,
.slide-leave-active {
    transition: transform 0.3s;
}

.slide-enter {
    transform: translateY(-100%);
}
.slide-enter-to {
    transform: translateY(0);
}

.slide-leave {
    transform: translateY(0);
}
.slide-leave-to {
    transform: translateY(-100%);
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
        opacity: 0;
        transform: translateY(25px);
    }

    to {
        opacity: 1;
        transform: translateY(0);
    }
}
@supports (backdrop-filter: blur(20px)) or (-webkit-backdrop-filter: blur(20px)) {
    .scrolled header,
    footer {
        background-color: rgba($dark-blue, 0.8) !important;
        -webkit-backdrop-filter: saturate(200%) blur(20px);
        backdrop-filter: saturate(200%) blur(20px);
    }
}

.header-container,
.notice-inner,
.page-section,
.stage-inner {
    max-width: 1440px;
    width: $large-width;
    @media (max-width: 1500px) {
        width: $small-width;
    }
}
</style>
