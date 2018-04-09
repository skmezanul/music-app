<template>
<div class="o-view__app" id="app" :style="getAppStyles">

    <!-- navigation -->
    <ma-sidebar></ma-sidebar>

    <main class="o-view__main u-sidebarMargin">

        <!-- notices -->
        <transition-group name="slide-down-transform">

            <ma-notice
            v-for="(notice, index) in notices"
            :key="index"
            :type="notice.type"
            :message="notice.message"
            ></ma-notice>

        </transition-group>

        <!-- header -->
        <ma-header></ma-header>

        <!-- router view -->
        <router-view :key="routerKey"></router-view>

    </main>

    <!-- footer -->
    <transition name="fade">
        <ma-footer></ma-footer>
    </transition>

    <!-- tooltips -->
    <div class="c-tooltips"></div>

    <!-- music video -->
    <ma-video></ma-video>
</div>
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
import maDeviceSplash from '@/components/splash/device';

export default {

  created() {
    // initialize the app on initial load
    this.initApp();
  },

  methods: {
    ...mapActions({
      initApp: 'app/INIT_APP',
    }),
  },

  computed: {
    ...mapGetters('app', {
      notices: 'getNotices',
      settings: 'getAppSettings',
    }),

    // get the styles for the app element
    getAppStyles() {
      const self = this,
        { settings } = self;

      return {
        '--accent-color': settings.currentAccentColor,
        '--u-sidebar-margin': `${settings.fixedSidebar ? 350 : 100}px`,
      };
    },

    routerKey() {
      const self = this,
        { name, params } = self.$route;

      let key = params.id;

      if (name === 'search') key = params.query;

      return key;
    },
  },

  components: {
    maHeader,
    maFooter,
    maSidebar,
    maVideo,
    maLoading,
    maDeviceSplash,
  },

};
</script>

<style lang='scss'>
@import 'static/scss/main';
</style>
