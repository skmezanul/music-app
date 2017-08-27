<template lang="pug">
#app(:class='{scrolled: $store.state.scrollPosition > 0}')

  // header
  ma-header

  // navigation
  ma-navigation

  // router view
  router-view(:key='$route.params.id')

  // footer
  transition(name='fade')
    ma-footer

  // tooltips
  .tooltip-container

  // loading spinner
  transition(name='fade')
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
  created() {
    // fetch the data when the view is created and the data is
    // already being observed
    this.showDevNotice();
    this.GET_CURRENT_USER();
    this.GET_MY_DEVICES();
  },
  methods: {
    ...mapActions(['GET_CURRENT_USER', 'GET_MY_DEVICES']),

    // show development notice
    showDevNotice() {
      this.$store.commit('ADD_NOTICE', this.$t('notices.wip'));
    },

    // remove notice
    removeNotice(index) {
      this.$store.commit('REMOVE_NOTICE', index);
    },

    // get the current scroll position
    updateScroll() {
      this.$store.commit('SCROLL_POSITION', window.scrollY);
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
* {
    box-sizing: border-box;
}

body {
    min-width: 611px;
    background-color: $main-bg-color;
    color: $white;
    letter-spacing: 1px;
    font-family: 'Roboto', sans-serif;
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
    font-family: 'Ubuntu', sans-serif;
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

.main-container {
    padding-bottom: 81px;
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

.btn {
    display: inline-flex;
    margin: 0 5px 10px 0;
    padding: 13px;
    border-radius: 3px;
    text-transform: uppercase;
    letter-spacing: 1.5px;
    font-weight: 700;
    font-size: 0.9em;
    font-family: 'Ubuntu', sans-serif;
    transition: background-color 0.3s, color 0.3s;
    &:hover {
        cursor: pointer;
    }
    &:not(.btn-transparent) {
        background-color: $light-blue;
        &:hover {
            background-color: $white;
            color: $black;
        }
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
}

.tooltip-container {
    .tooltip {
        z-index: 999;
        display: block !important;
        letter-spacing: 1px;
        font-family: 'Roboto', sans-serif;
        transition: opacity 0.3s, visibility 0.3s;

        .tooltip-inner {
            padding: 5px 7px;
            border-radius: 3px;
            background: $dark-blue;
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
.loader-container,
.main-container,
.notice-container,
header {
    margin-left: 200px;
}
@media screen and (max-width: 955px) {
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
        background-color: rgba($dark-blue, 0.7);
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
    @media screen and (max-width: 1500px) {
        width: $small-width;
    }
}
</style>
