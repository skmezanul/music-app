<template>
<aside class="c-sidebar" v-on-clickaway="closePanel">
    <div class="c-sidebar__inner">

        <!-- primary navigation -->
        <ul class="c-sidebar__panelSelect">

            <li
            class="c-sidebar__selectItem"
            v-for="(item, index) in panels"
            :key="index"
            :class="[`c-sidebar__selectItem--${item.name}`, { 'is-active' : index === activePanel && isPanelOpen }]"
            @click="togglePanel(index)"
            >

                <!-- icon -->
                <a v-if="item.icon" class="c-sidebar__selectItemIcon">
                    <ma-icon :hover="true">

                    {{ item.icon }}

                    </ma-icon>
                </a>

                <!-- user avatar -->
                <div class="c-sidebar__selectItemAvatar" v-else>

                  <img
                  class="c-sidebar__selectItemAvatarImage"
                  v-if="currentUser.images"
                  :src="currentUser.images[0].url"
                  :alt="currentUser.display_name"
                  />

                </div>
            </li>

        </ul>

    </div>

    <!-- sidebar panel -->
    <transition name="slide-right-transform">
        <div
        class="c-sidebarPanel"
        v-if="isPanelOpen"
        :class="{ 'is-fixed' : settings.fixedSidebar }"
        >

            <!-- fixed sidebar toggle -->
            <a class="c-sidebarPanel__fixedToggle" @click="toggleFixedSidebar">
                <ma-icon
                type="small"
                :hover="true"
                >

                {{ settings.fixedSidebar ? 'lock' : 'lock_open' }}

                </ma-icon>
            </a>

            <transition name="fade" mode="out-in">

                <!-- panel content -->
                <div
                class="c-sidebarPanel__inner"
                v-for="(panel, index) in panels"
                v-if="activePanel === index"
                :key="index"
                ref="panelInner"
                >

                    <!-- component -->
                    <component
                    :is="panel.component"
                    :key="index"
                    @close-panel="closePanel"
                    ></component>

                </div>

            </transition>

            <!-- expanded album cover -->
            <transition name="slide-up-margin">

                <router-link
                class="c-sidebarPanel__cover"
                tag="div"
                :to="{ name: 'artist', params: { id: currentPlayback.item.artists[0].id }}"
                v-if="settings.largeCover"
                >

                    <!-- large cover close button -->
                    <a @click.prevent="setAppSettings({ largeCover: false })">
                      <ma-button
                      type="overlay"
                      icon="close"
                      ></ma-button>
                    </a>

                    <!-- cover image -->
                    <img
                    class="c-sidebarPanel__coverImage"
                    :src="currentPlayback.item.album.images[0].url"
                    :alt="currentPlayback.item.name"
                    />

                </router-link>

            </transition>
        </div>
    </transition>
</aside>
</template>

<script>
import {
  mapGetters,
  mapMutations,
} from 'vuex';

import { directive as onClickaway } from 'vue-clickaway';

// import dynamic components
import user from './components/views/user';
import browse from './components/views/browse';
import playlists from './components/views/playlists';
import newplaylist from './components/views/newplaylist';

export default {

  data: () => ({
    activePanel: false,
    panels: [{
      name: 'user',
      component: user,
    },
    {
      name: 'browse',
      icon: 'music_note',
      component: browse,
    },
    {
      name: 'playlists',
      icon: 'playlist_play',
      component: playlists,
    },
    {
      name: 'newplaylist',
      icon: 'playlist_add',
      component: newplaylist,
    },
    ],
  }),

  created() {
    // activePanel defaults to 0 if sidebar is fixed
    this.activePanel = this.settings.fixedSidebar ? 1 : false;
  },

  methods: {
    ...mapMutations('app', {
      setAppSettings: 'SET_APP_SETTINGS',
    }),

    // toggle the fixed sidebar
    toggleFixedSidebar() {
      const self = this;

      self.setAppSettings({
        fixedSidebar: !self.settings.fixedSidebar,
      });
    },

    // toggle the panel
    togglePanel(panel) {
      const self = this,
        { fixedSidebar } = self.settings;

      if (self.activePanel === panel && !fixedSidebar) {
        self.activePanel = false;
      } else if (typeof panel === 'number') {
        self.activePanel = panel;
      }
    },

    // close the panel
    closePanel() {
      const self = this,
        { fixedSidebar } = self.settings;

      if (self.activePanel && !fixedSidebar) {
        self.activePanel = false;
      }
    },
  },

  computed: {
    ...mapGetters({
      currentPlayback: 'playback/getCurrentPlayback',
      currentUser: 'user/getCurrentUser',
      playlists: 'user/getPlaylists',
      settings: 'app/getAppSettings',
    }),

    // check if panel currently open
    isPanelOpen() {
      const self = this,
        isOpen = self.settings.fixedSidebar || self.activePanel;
      return isOpen;
    },
  },

  directives: {
    onClickaway,
  },

};
</script>
