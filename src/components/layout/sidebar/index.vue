<template lang='pug'>
.sidebar-container(
	:class='{ "is-open" : isPanelOpen && !settings.fixedSidebar, "is-fixed" : settings.fixedSidebar }',
	v-on-clickaway='closePanel')
	aside.sidebar-inner

		// primary navigation
		ul.panel-select
			li.panel-select-item(
				v-for='(item, index) in panels',
				:key='index',
				:class='[ item.name, { "active" : index === activePanel && isPanelOpen } ]',
				@click='togglePanel(index)')
				ma-icon.panel-select-icon(:hover='true', v-if='item.icon', :class='{ "active" : index === activePanel && isPanelOpen }') {{ item.icon }}
				// user avatar
				.avatar-container(v-else)
					img.avatar-image(
						v-if='currentUser',
						:src='currentUser.images[0].url',
						:alt='currentUser.display_name')

	// sidebar panel
	transition(name='slide-right-transform')
		main.sidebar-panel(v-if='isPanelOpen')

			// fixed sidebar toggle
			ma-icon.toggle-fixed-sidebar(:hover='true', @click.native='toggleFixedSidebar') {{ settings.fixedSidebar ? 'lock' : 'lock_open' }}

			transition(name='fade', mode='out-in')
				// panel content
				.panel-inner(
					v-for='(panel, index) in panels',
					v-if='activePanel === index',
					:key='index',
					ref='panelInner')
					component(:is='panel.component', :key='index', @close-panel='closePanel')
			// expanded album cover
			transition(name='slide-up-margin')
				router-link.cover-container(
					tag='div',
					:to='{ name: "artist", params: { id: currentPlayback.item.artists[0].id }}',
					v-if='settings.largeCover')
						ma-button(type='overlay', @click.prevent.native='setAppSettings({ setting: "largeCover", value: false })', icon='close')
						img.cover-image(
							:src='currentPlayback.item.album.images[0].url',
							:alt='currentPlayback.item.name')
</template>

<script>
import {
  mapGetters,
  mapMutations,
} from 'vuex';

import {
  directive as onClickaway,
} from 'vue-clickaway';

// import dynamic components
import user from './components/views/user';
import browse from './components/views/browse';
import playlists from './components/views/playlists';
import newplaylist from './components/views/newplaylist';
import listening from './components/views/listening';

export default {
  data() {
    return {
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
          name: 'listening',
          icon: 'person_pin',
          component: listening,
        },
        {
          name: 'newplaylist',
          icon: 'playlist_add',
          component: newplaylist,
        },
      ],
    };
  },
  created() {
    // activePanel defaults to 0 if sidebar is fixed
    this.activePanel = this.settings.fixedSidebar ? 1 : false;
  },
  methods: {
    ...mapMutations({
      setAppSettings: 'SET_APP_SETTINGS',
    }),

    toggleFixedSidebar() {
      this.setAppSettings({
        setting: 'fixedSidebar',
      });
    },

    closePanel() {
      const self = this,
        {
          fixedSidebar
        } = self.settings;
      if (self.activePanel && !fixedSidebar) {
        self.activePanel = false;
      }
    },

    togglePanel(panel) {
      const self = this,
        {
          fixedSidebar
        } = self.settings;
      if (self.activePanel === panel && !fixedSidebar) {
        self.activePanel = false;
      } else if (typeof panel === 'number') {
        self.activePanel = panel;
      }
    },
  },
  computed: {
    ...mapGetters({
      currentPlayback: 'getCurrentPlayback',
      currentUser: 'getCurrentUser',
      playlists: 'getPlaylists',
      settings: 'getAppSettings',
    }),
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

<style lang='scss'>
.sidebar-container {
    @include flex($display: flex);
    @include relative($index: 999);
    margin-bottom: 81px;
    grid-area: sidebar;
    box-shadow: $shadow;

    &.is-fixed {
        @include flex($display: flex);
        background-color: lighten($dark-grey, 2%);
    }
    &:not(.is-fixed) {
        .sidebar-panel {
            @include absolute($top: 0, $bottom: 0, $left: 100px, $index: 1);
            @supports (backdrop-filter: blur(25px) saturate(250%)) {
                backdrop-filter: blur(25px) saturate(250%);
            }
            background-color: rgba($dark-grey, 0.8);
        }
    }

    .sidebar-inner {
        @include flex($display: flex, $direction: column, $justify: space-between, $align: center);
        @include relative($index: 2);
        padding-top: 10em;
        width: 100px;
        border-right: 1px solid $border-color;
        background-color: $dark-grey;
        .panel-select {
            @include flex($display: flex, $direction: column);
            height: 100%;
            .panel-select-item {
                margin-bottom: 1.5em;
                &.newplaylist {
                    margin-top: auto;
                }
                &.active {
                    .avatar-container {
                        border-color: $white !important;
                    }
                    .panel-select-icon {
                        background-color: $white;
                        color: $white;
                        color: $black !important;
                    }
                }
                &.user {
                    @include absolute($top: 3em, $left: 50%);
                    margin: 0;
                    transform: translateX(-50%);
                    &:hover {
                        cursor: pointer;
                    }
                    .avatar-container {
                        overflow: hidden;
                        width: 55px;
                        height: 55px;
                        border: 3px solid;
                        border-color: transparent;
                        border-radius: 100%;
                        transition: border-color 0.3s;
                    }
                }
                .panel-select-icon {
                    padding: 9px;
                    border-radius: 100%;
                    font-size: 1.7em;
                }
            }
        }
    }

    .sidebar-panel {
        @include flex($display: flex, $direction: column);
        padding-top: 10em;
        width: 250px;
        border-right: 1px solid $border-color;
        .toggle-fixed-sidebar {
            @include absolute($top: 20px, $right: 20px);
            @include font($size: 1em);
            @include item-hover;
        }
        .panel-inner {
            @include flex($display: flex, $direction: column);
            @include relative;
            padding: 0 1.5em;
        }
        .cover-container {
            @include relative;
            margin-top: auto;
            border-top: 1px solid $border-color;
            .button {
                opacity: 0;
            }
            &:hover {
                .button {
                    opacity: 1;
                }
            }
        }
    }
}
</style>
