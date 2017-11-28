<template>
<div class="sidebar-container" :class="{ 'is-open' : panel }">
  <ul class="sidebar-inner">
    <li class="sidebar-section user">
      <router-link class="avatar-container" tag="div" :to="{ name: 'user', params: { id: currentUser.id } }">
        <img :src="currentUser.images[0].url" :alt="currentUser.display_name" />
      </router-link>
    </li>
    <nav class="sidebar-section navigation">
      <li>
        <i @click="togglePanel('listen')" class="material-icons">history</i>
      </li>
      <li>
        <i @click="togglePanel('share')" class="material-icons">music_note</i>
      </li>
      <li>
        <i @click="togglePanel('radio')" class="material-icons">album</i>
      </li>
    </nav>
    <li class="sidebar-section newplaylist">
      <i class="material-icons">playlist_add</i>
    </li>
  </ul>
  <!-- Panel -->
  <transition name="slide-right-transform">
    <div v-if="panel" class="sidebar-panel listen">
      <transition-group name="fade">
      <ul v-if="panel === 'listen'" class="panel-inner" :class="panel" key="listen">
        <div class="sidebar-section navigation">
          <li>
            <router-link :to="{ name: 'browse' }">{{ $t('browse') }}</router-link>
          </li>
          <li>
            <router-link :to="{ name: 'mylibraryHistory' }">{{ $t('recentlyplayed') }}</router-link>
          </li>
          <li>
            <router-link :to="{ name: 'mylibraryTracks' }">{{ $tc('track', 0) }}</router-link>
          </li>
          <li>
            <router-link :to="{ name: 'mylibraryAlbums' }">{{ $tc('album', 0) }}</router-link>
          </li>
        </div>
        <li class="sidebar-section newplaylist">
          <a>{{ $t('newplaylist') }}</a>
        </li>
      </ul>

      <div v-if="panel === 'share'" class="panel-inner" :class="panel" key="share">

      </div>

      <div v-if="panel === 'radio'" class="panel-inner" :class="panel" key="radio">

      </div>
      </transition-group>
    </div>
  </transition>
</div>
</template>

<script>
import {
  mapGetters,
  mapMutations,
} from 'vuex';
import {
  directive as onClickaway,
} from 'vue-clickaway';

export default {
  data() {
    return {
      panel: '',
    };
  },
  methods: {
    ...mapMutations({
      setAppSettings: 'SET_APP_SETTINGS',
    }),

    togglePanel(panel) {
      const self = this;
      if (self.panel === panel) {
        self.panel = '';
      } else {
        self.panel = panel;
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
  },
  directives: {
    onClickaway,
  },
};
</script>

<style lang="scss">
.sidebar-container {
    grid-area: sidebar;
    @include flex($display: flex);
    @include relative;
    margin-bottom: 81px;
    .sidebar-inner {
        @include flex($display: flex, $direction: column, $justify: space-between, $align: center);
        border-right: 1px solid $border-color;
        @include relative($z-index: 1000);
        background-color: $dark-grey;
        padding-top: 3.5em;
        width: 100px;
        height: 100%;
        .sidebar-section {
            &.navigation {
                margin-top: 4em;
                li {
                    i {
                        font-size: 2em;
                        @include item-hover;
                    }
                }
            }
        }
    }
    .sidebar-panel {
        min-width: 230px;
        @include absolute($top: 0, $bottom: 0, $left: 100px, $z-index: 999);
        background-color: rgba($dark-grey, 0.6);
        border-right: 1px solid $border-color;
        .panel-inner {
            padding: 11em 1em 0 2em;
            @include flex($display: flex, $direction: column);
            height: 100%;
            .sidebar-section {
                &.navigation {
                    li {
                      &:hover {
                          transform: translateX(5px);
                      }
                    }
                }
            }
        }
    }
    .sidebar-section {
        @include flex($display: flex, $direction: column);
        &.user {
            .avatar-container {
                height: 50px;
                width: 50px;
                overflow: hidden;
                border-radius: 100%;
            }
        }
        &.navigation {
            li {
                margin-bottom: 2em;
                transition: transform 0.3s;
                a {
                    @include font($transform: uppercase, $spacing: 2px);
                    @include item-hover;
                    &.active {
                        @include font($weight: 600, $color: var(--accent-color));
                    }
                }
            }
        }
        &.newplaylist {
            margin-top: auto;
            padding: 2em 0;
            a,
            i {
                @include item-hover;
            }
        }
    }
}
</style>
