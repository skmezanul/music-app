<template lang='pug'>
.sidebar-container(
  :class='{ "is-open" : isPanelOpen && !settings.fixedSidebar, "is-fixed" : settings.fixedSidebar }',
  v-on-clickaway='closePanel')
  aside.sidebar-inner

    // primary navigation
    ul.navigation
      li(
        v-for='(item, index) in panels',
        :key='index',
        :class='[ item.name, { "active" : index === activePanel && isPanelOpen } ]',
        @click='togglePanel(index)')
        i.material-icons(v-if='item.icon', :class='{ "active" : index === activePanel && isPanelOpen }') {{ item.icon }}
        // user avatar
        .avatar-container(v-else)
          img(
            v-if='currentUser',
            :src='currentUser.images[0].url',
            :alt='currentUser.display_name')

  // sidebar panel
  transition(name='slide-right-transform')
    main.sidebar-panel(v-if='isPanelOpen')

      // fixed sidebar toggle
      i.toggle-fixed-sidebar.material-icons(@click='toggleFixedSidebar') {{ settings.fixedSidebar ? 'lock' : 'lock_open' }}

      transition(
        @enter='panelContentEnter',
        @leave='panelContentLeave',
        mode='out-in',
        :css='false')
        // panel contents
        .panel-inner(
          v-for='(panel, index) in panels',
          v-if='activePanel === index',
          :key='index')
          .active-line(ref='activeLine', :class='`panel-${activePanel}`')
          keep-alive
            component(:is='panel.component', :key='index', @clicked-element='updateActiveElement')
      transition(name='slide-up-margin')
        router-link.cover-container(
          tag='div',
          :to='{ name: "artist", params: { id: currentPlayback.item.artists[0].id }}',
          v-if='settings.largeCover')
            ma-button(type='overlay', @click.prevent.native='setAppSettings({ setting: "largeCover", value: false })', icon='close')
            img(
              :src='currentPlayback.item.album.images[0].url',
              :alt='currentPlayback.item.name')
</template>

<script>
import {
  mapGetters,
  mapMutations,
} from 'vuex';
import {
  TweenMax,
  TimelineLite,
} from 'gsap';
import {
  directive as onClickaway,
} from 'vue-clickaway';

// import views
import user from './views/user';
import browse from './views/browse';
import playlists from './views/playlists';
import newplaylist from './views/newplaylist';

export default {
  data() {
    return {
      activePanel: null,
      panels: [{
          name: 'user',
          component: user,
        },
        {
          name: 'home',
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
    };
  },
  created() {
    // activePanel defaults to 0 if sidebar is fixed
    this.activePanel = this.settings.fixedSidebar ? 1 : null;
  },
  watch: {
    'this.activePanel': 'updateActiveElement',
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

    updateActiveElement(event) {
      const self = this,
        clickedElement = event.target,
        parentElement = clickedElement.closest('li'),
        spaceAboveElement = parentElement.offsetTop,
        elementHeight = parentElement.offsetHeight;
      TweenMax.to(self.$refs.activeLine, 0.5, {
        height: elementHeight,
        y: spaceAboveElement,
        onComplete: self.closePanel(),
      });
    },

    closePanel() {
      const self = this;
      if (self.activePanel !== null && !self.settings.fixedSidebar) {
        self.activePanel = null;
      }
    },

    togglePanel(panel) {
      const self = this;
      if (self.activePanel === panel && !self.settings.fixedSidebar) {
        self.activePanel = null;
      } else if (typeof panel === 'number') {
        self.activePanel = panel;
      }
    },

    panelContentEnter(el, done) {
      const listElement = '.panel-inner li',
        activeLine = '.panel-inner .active-line',
        tl = new TimelineLite({
          onComplete: done,
        });
      tl.staggerFromTo(listElement, 0.5, {
          autoAlpha: 0,
        }, {
          autoAlpha: 1,
        }, 0.05)
        .fromTo(activeLine, 0.5, {
          autoAlpha: 0,
        }, {
          autoAlpha: 1,
        }, '-=0.5');
    },

    panelContentLeave(el, done) {
      TweenMax.to('.panel-inner', 0.3, {
        autoAlpha: 0,
        onComplete: done,
      });
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
      return (this.settings.fixedSidebar || this.activePanel !== null);
    },
  },
  directives: {
    onClickaway,
  },
  components: {
    user,
    browse,
    playlists,
    newplaylist,
  },
};
</script>

<style lang='scss'>
.sidebar-container {
    @include flex($display: flex);
    @include relative($z-index: 999);
    margin-bottom: 81px;
    grid-area: sidebar;
    &.is-fixed {
        @include flex($display: flex);
    }
    &:not(.is-fixed) {
        .sidebar-panel {
            @include absolute($top: 0, $bottom: 0, $left: 100px, $z-index: 1);
            background-color: rgba($dark-grey, 0.8);
            @supports (backdrop-filter: blur(10px) saturate(200%)) {
                backdrop-filter: blur(25px) saturate(250%);
            }
        }
    }
    .sidebar-inner {
        @include flex($display: flex, $direction: column, $justify: space-between, $align: center);
        @include relative($z-index: 2);
        padding-top: 10em;
        border-right: 1px solid $border-color;
        background-color: $dark-grey;
        width: 100px;
        .current-user {
            @include absolute($top: 3em);
            &:hover {
                cursor: pointer;
            }
            .avatar-container {
                overflow: hidden;
                width: 50px;
                height: 50px;
                border-radius: 100%;
            }
        }
    }
    .sidebar-panel {
        width: 250px;
        padding-top: 10em;
        border-right: 1px solid $border-color;
        @include flex($display: flex, $direction: column);
        .toggle-fixed-sidebar {
            @include absolute($top: 20px, $right: 20px);
            @include font($size: 1em);
            @include item-hover;
        }
        .panel-inner {
            @include flex($display: flex, $direction: column);
            @include relative;
            padding: 0 1.5em;
            .active-line {
                @include absolute($left: -1px, $z-index: 3);
                width: 1px;
                background-color: var(--accent-color);
            }
            li {
                transition: transform 0.5s;
                &:hover {
                    cursor: pointer;
                    transform: translateX(7px);
                }
                margin-bottom: 1.5em;
                .title {
                    font-size: 1.1em;
                    white-space: nowrap;
                    text-overflow: ellipsis;
                    overflow: hidden;
                    display: block;
                    font-weight: 600;
                }
                .meta-container {
                    margin-top: 5px;
                    font-size: 0.9em;
                    color: rgba($white, 0.7);
                }
            }
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

.navigation {
    @include flex($display: flex, $direction: column);
    height: 100%;
    li {
        margin-bottom: 1.5em;
        &.newplaylist {
            margin-top: auto;
        }
        &.active {
          .avatar-container {
              border-color: $white !important;
          }
          i {
            color: $white;
            background-color: $white;
            color: $black !important;
          }
        }
        &.user {
            @include absolute($top: 3em, $left: 50%);
            transform: translateX(-50%);
            margin: 0;
            &:hover {
                cursor: pointer;
            }
            .avatar-container {
                border: 3px solid;
                border-color: transparent;
                transition: border-color 0.3s;
                overflow: hidden;
                width: 55px;
                height: 55px;
                border-radius: 100%;
            }
        }
        a {
            @include font($transform: uppercase, $spacing: 2px);
            @include item-hover;
        }
        i {
            @include item-hover;
            font-size: 1.7em;
            border-radius: 100%;
            padding: 9px;
        }
    }
}
</style>
