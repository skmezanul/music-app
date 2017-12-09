<template lang='pug'>
.sidebar-container(:class='{ "is-open" : panelOpen && !settings.fixedSidebar, "is-fixed" : settings.fixedSidebar }')
  aside.sidebar-inner
    // user avatar
    .current-user
      router-link.avatar-container(
        tag='div',
        :to='{ name: "user", params: { id: currentUser.id } }')
        img(
          :src='currentUser.images[0].url',
          :alt='currentUser.display_name')

    // primary navigation
    ul.navigation
      li(
        v-for='(item, index) in panels',
        :key='index',
        :class='item.name')
        i.material-icons(@click='togglePanel(index)', :class='{ "active" : index === activePanel && isPanelOpen }') {{ item.icon }}

  // sidebar panel
  main.sidebar-panel(v-if='isPanelOpen')

    // fixed sidebar toggle
    i.toggle-fixed-sidebar.material-icons(@click='toggleFixedSidebar') {{ settings.fixedSidebar ? 'lock' : 'lock_open' }}

    transition(@enter='panelContentEnter', @leave='panelContentLeave', mode='out-in', :css='false')
      // panel contents
      ul.panel-inner(
        v-for='(panel, index) in panels',
        v-if='activePanel === index',
        :key='index')
        .active-line
        router-link(
          v-for='item in panel.content',
          :key='item.name',
          tag='li',
          :to='{ name: item.id ? "playlist" : item.routeName, params: item.id ? { id: item.id, owner: item.owner.id } : {} }',
          @click.native='onItemClick')
          span.title {{ item.name }}
          .meta-container
            span(v-if='item.tracks || item.meta') {{ item.tracks ? `${item.tracks.total} ${$tc('track', 0)}` : item.meta }}

      .panel-inner(v-if='activePanel === 3', key='newplaylist')
        p Create new playlist
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

export default {
  data() {
    return {
      activePanel: 0,
      panelOpen: false,
      panels: [{
        name: 'home',
        icon: 'music_note',
        content: [{
          name: this.$t('browse'),
          routeName: 'browse',
          meta: 'Browse the latest music',
        },
        {
          name: this.$t('recentlyplayed'),
          routeName: 'mylibraryHistory',
          meta: 'Your playback history',
        },
        {
          name: this.$tc('track', 0),
          routeName: 'mylibraryTracks',
          meta: 'Your saved tracks',
        },
        {
          name: this.$tc('album', 0),
          routeName: 'mylibraryAlbums',
          meta: 'Your saved albums',
        },
        ],
      },
      {
        name: 'playlists',
        icon: 'playlist_play',
        content: [],
      },
      {
        name: 'newplaylist',
        icon: 'playlist_add',
      },
      ],
    };
  },
  created() {
    // add playlists to data
    this.panels[1].content = this.playlists;
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

    onItemClick(event) {
      const self = this,
        clickedElement = event.target,
        closestListElement = clickedElement.closest('li'),
        spaceAboveElement = closestListElement.offsetTop;
      TweenMax.to('.active-line', 0.5, {
        y: spaceAboveElement,
        onComplete: self.closePanel(),
      });
    },

    closePanel() {
      const self = this;
      if (self.panelOpen && !self.settings.fixedSidebar) {
        self.panelOpen = false;
      }
    },

    togglePanel(panel) {
      const self = this;
      if (self.activePanel === panel && self.panelOpen) {
        self.panelOpen = false;
      } else if (!self.panelOpen) {
        self.panelOpen = true;
      }
      if (typeof panel === 'number') {
        self.activePanel = panel;
      } else if (typeof panel === 'boolean') {
        self.panelOpen = panel;
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
      return (this.settings.fixedSidebar || this.panelOpen);
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
    @include relative($z-index: 1000);
    margin-bottom: 81px;
    grid-area: sidebar;
    &.is-fixed {
      @include flex($display: flex);
    }
    &:not(.is-fixed) {
      .sidebar-panel {
        @include absolute($top: 0, $bottom: 0, $left: 97px, $z-index: 1);
      }
    }
    .sidebar-inner {
        @include flex($display: flex, $direction: column, $justify: space-between, $align: center);
        @include relative($z-index: 2);
        padding-top: 10em;
        border-right: 1px solid $border-color;
        background-color: $dark-grey;
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
        background-color: rgba($dark-grey, 0.6);
        .toggle-fixed-sidebar {
            @include absolute($top: 20px, $right: 20px);
            @include font($size: 1em);
            @include item-hover;
        }
        .panel-inner {
            @include flex($display: flex, $direction: column);
            @include relative;
            .active-line {
              @include absolute($left: -1px, $z-index: 3);
              height: 41px;
              width: 1px;
              background-color: var(--accent-color);
            }
            li {
              padding: 0 1.5em;
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
    }
}

.navigation {
    @include flex($display: flex, $direction: column);
    height: 100%;
    li {
        margin: 0 2em 2em;
        &.newplaylist {
            margin-top: auto;
        }
        a {
            @include font($transform: uppercase, $spacing: 2px);
            @include item-hover;
            &.active {
                @include font($weight: 600, $color: var(--accent-color));
            }
        }
        i {
            @include item-hover;
            font-size: 2em;
            &.active {
              color: $white;
            }
        }
    }
}
</style>
