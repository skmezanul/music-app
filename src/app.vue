<template lang='pug'>
#app(:style='{ "--accent-color" : settings.accentColor, "--sidebar-margin" : `${settings.fixedSidebar ? 350 : 100}px` }')

	// navigation
	ma-sidebar(v-if='!$mq.phone')

	main.main-container.sidebar-margin
		// notices
		transition-group(name='slide-down-transform')
			ma-notice(
				v-for='(notice, index) in notices',
				:key='index',
				:type='notice.type',
				:message='notice.message')

		// header
		ma-header

		// preloader
		transition(name='fade')
			ma-loading(v-if='$isLoading("data")')
				ma-loader(slot='spinner')

		// router view
		transition(name='fade', mode='out-in')
			router-view(:key='$route.path')

	// footer
	transition(name='fade')
		ma-footer

	// tooltips
	.tooltip-container

	// music video
	ma-video
</template>

<script>
import {
  mapActions,
  mapGetters,
} from 'vuex';

import maHeader from '@/components/layout/header';
import maFooter from '@/components/layout/footer';
import maSidebar from '@/components/layout/sidebar/index';
import maVideo from '@/components/modals/video';
import maLoading from '@/components/loader';

export default {
  created() {
    // fetch the data when the view is created and the data is
    // already being observed
    this.GET_USER('profile');
    this.GET_USER('playlists');
    this.GET_PLAYBACK();
  },
  methods: {
    ...mapActions(['GET_USER', 'GET_PLAYBACK']),
  },
  computed: {
    ...mapGetters({
      notices: 'getNotices',
      settings: 'getAppSettings',
    }),
  },
  components: {
    maHeader,
    maFooter,
    maSidebar,
    maVideo,
    maLoading,
  },
};
</script>

<style lang='scss'>
/** Thin */
@font-face {
    font-weight: 300;
    font-family: 'San Francisco';
    src: url("../static/fonts/sanfranciscodisplay-thin-webfont.woff");
}

/** Regular */
@font-face {
    font-weight: 400;
    font-family: 'San Francisco';
    src: url("../static/fonts/sanfranciscodisplay-regular-webfont.woff");
}

/** Bold */
@font-face {
    font-weight: 600;
    font-family: 'San Francisco';
    src: url("../static/fonts/sanfranciscodisplay-semibold-webfont.woff");
}

/** Bold */
@font-face {
    font-weight: 600;
    font-family: 'Open Sans';
    src: url("../static/fonts/OpenSans-Bold.ttf");
}

* {
    box-sizing: border-box;
}

body {
    background-color: $main-bg-color;
}

input {
    user-select: text;
}

img {
    display: block;
    width: 100%;
    height: auto;
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
}

h1 {
    @include font($spacing: 2px);
}

h4 {
    @include font($spacing: 2px, $transform: uppercase, $color: rgba($white, 0.7));
}

pre {
    overflow-x: auto;
}

figure {
    margin: 0;
    background-size: cover;
    background-repeat: no-repeat;
}

a {
    &:active,
    &:link,
    &:visited {
        @include font($color: $white);
        text-decoration: none;
    }
}

// vue instance container
#app {
    @include font($spacing: 1px, $color: $white);
    font-family: $primary-family;
    user-select: none;
    // main-container containing header and view-container
    .main-container {
        // view-parent element to render components and wrap stage and view-content
        .view-parent {
            @include view-grid-columns;
            display: grid;
            grid-auto-rows: auto;
            grid-template-areas: "stage stage stage" ". content .";
            grid-row-gap: 2em;
            // view-content containing stacked sections
            .view-content {
                display: grid;
                grid-area: content;
                grid-auto-rows: auto;
                grid-row-gap: 3em;
                @media (max-width: $mobile-breakpoint) {
                    grid-column: span 3;
                }
            }
        }
    }
}

.sidebar-margin {
    margin-left: var(--sidebar-margin);
    @media (max-width: $mobile-breakpoint) {
        margin-left: 0;
    }
}

// dropdown styling
.dropdown {
    @include absolute($top: 58px, $right: 0, $index: 999);
    overflow: hidden;
    width: 150px;
    border-radius: 5px;
    background-color: $dark-blue;

    li {
        @include font($size: 0.9em);
        padding: 15px;
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
        @include relative($index: 1000);
        display: block !important;
        margin-bottom: 12px;
        transition: opacity 0.3s, visibility 0.3s;

        .tooltip-inner {
            @include font($spacing: 1.5px);
            padding: 7px 10px;
            border-radius: 3px;
            background: var(--accent-color);
            font-weight: 600;
            font-family: $primary-family;
            transition: background-color 0.3s;
            &:after {
                @include absolute($top: 100%, $left: calc(50% - 8px));
                border: 8px solid;
                border-color: var(--accent-color) transparent transparent transparent;
                content: "";
                transition: border-color 0.3s;
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

// slide right transition with transform (sidebar panel)
.slide-right-transform-enter-active,
.slide-right-transform-leave-active {
    transition: transform 0.3s;
}

.slide-right-transform-enter {
    transform: translateX(-100%);
}
.slide-right-transform-leave-to {
    transform: translateX(-100%);
}

// slide up transition with margin (cover in sidebar)
.slide-up-margin-enter-active,
.slide-up-margin-leave-active {
    transition: margin 0.3s;
}

.slide-up-margin-enter {
    margin-bottom: -100%;
}
.slide-up-margin-leave-to {
    margin-bottom: -100%;
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
</style>
