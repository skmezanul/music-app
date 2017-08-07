<template>
<div id="app" :class="{scrolled: $store.state.scrollPosition > 0}">

  <!-- header -->
  <headerbar></headerbar>

  <!-- sidenav -->
  <sidenav></sidenav>

  <!-- router view -->
  <router-view :key="$route.params.id"></router-view>

  <!-- footer -->
  <transition name="fade">
    <footerbar></footerbar>
  </transition>

  <div class="tooltip-container">

    <!-- insert tooltips -->

  </div>

  <loading class="loading-container">
    <template slot="spinner">
        <spinner></spinner>
      </template>
  </loading>

  <transition-group name="fade" tag="notices">
    <notice v-for="(notice, index) in $store.state.notice" :key="index" :message="notice" @remove="$store.commit('REMOVE_NOTICE', index)"></notice>
  </transition-group>

</div>
</template>

<script>
export default {
  created() {
    // fetch the data when the view is created and the data is
    // already being observed
    this.getCurrentUser();
    this.getMyDevices();
    this.getCurrentPlayback();
    this.showDevNotice();
  },
  methods: {

    // show development notice
    showDevNotice() {
      this.$store.commit('ADD_NOTICE', 'This app is still work in progress. Contact me (microeinhundert) on github if you want to contribute to the development.');
    },

    // get the current user's info
    getCurrentUser() {
      this.axios({
        method: 'get',
        url: '/me',
      }).then((res) => {
        this.$store.commit('CURRENT_USER', res.data);
      }).catch((err) => {
        this.$store.commit('CURRENT_USER', []);
        this.$store.commit('ADD_NOTICE', `Current user could not be fetched, please try again later. ${err}`);
      });
    },

    // get the current device's ID
    getMyDevices() {
      this.axios({
        method: 'get',
        url: '/me/player/devices',
      }).then((res) => {
        this.$store.commit('DEVICE_ID', res.data.devices[0].id);
      }).catch((err) => {
        this.$store.commit('DEVICE_ID', null);
        this.$store.commit('ADD_NOTICE', `Available devices could not be fetched, please try again later. ${err}`);
      });
    },

    // get the current playback
    getCurrentPlayback() {
      this.$startLoading('fetching data');
      this.axios({
        method: 'get',
        url: '/me/player',
      }).then((res) => {
        this.$store.commit('CURRENT_PLAYBACK', res.data);
        this.$endLoading('fetching data');
      }).catch((err) => {
        this.$store.commit('CURRENT_PLAYBACK', []);
        this.$endLoading('fetching data');
        this.$store.commit('ADD_NOTICE', `Could not fetch your current playback, please try again later. ${err}`);
      });
    },

    // get the current scroll position
    updateScroll() {
      this.$store.commit('SCROLL_POSITION', window.scrollY);
    },
  },
  mounted() {
    window.addEventListener('scroll', this.updateScroll);
  },
  destroy() {
    window.removeEventListener('scroll', this.updateScroll);
  },
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
    -webkit-user-select: none;
}

input {
    user-select: text;
    -webkit-user-select: text;
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
    letter-spacing: 2px;
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
        margin-bottom: 25px;
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
    transition: opacity 0.3s;
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
    .scrolled .header {
        background-color: rgba($dark-blue, 0.7) !important;
        backdrop-filter: saturate(200%) blur(20px);
        -webkit-backdrop-filter: saturate(200%) blur(20px);
    }
}

.header-inner,
.notice-inner,
.page-section,
.stage-inner {
    width: $large-width;
    max-width: 1440px;
    @media screen and (max-width: 1500px) {
        width: $small-width;
    }
}
</style>
