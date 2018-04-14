<template>
<div class="c-stage" :class="stageClasses">

    <!-- background image -->
    <div v-if="image[0]" class="c-stage__background">

        <figure
        class="c-stage__backgroundImage"
        v-lazy:background-image="image[0].url"
        ></figure>

    </div>

    <div class="c-stage__inner">

        <!-- cover -->
        <div class="c-stage__cover" v-if="hasCover">

            <!-- cover image -->
            <img class="c-stage__coverImage" v-lazy="image[0].url" :alt="title" />

        </div>

        <!-- content -->
        <div class="c-stage__content">

            <!-- subtitle -->
            <div class="c-stage__subtitle">

                <h4 v-if="subtitle">

                    <span>{{ getProfile ? `${subtitle || stage.subtitle} ${$t('by')} ` : subtitle }}</span>

                    <router-link
                    class="c-stage__subtitleLink"
                    v-if="profile"
                    :to="{ name: getProfile.type, params: { id: getProfile.id } }"
                    >

                    {{ getProfile.name || getProfile.display_name }}

                    </router-link>
                </h4>

                <!-- icon if popular -->
                <span class="c-stage__popularIcon">
                    <ma-icon v-if="popularity && popularity > 80" type="small">stars</ma-icon>
                </span>
            </div>

            <!-- title -->
            <h1
            class="c-stage__title"
            v-if="title"
            :class="{ 'is-large' : hasLargeTitle }"
            >

            {{ title }}

            </h1>

            <!-- meta -->
            <div class="c-stage__meta" v-if="meta">
                <p v-html="formatMeta(meta)"></p>
            </div>

            <!-- actions -->
            <div class="c-stage__actions" v-if="hasActions">

                <!-- play all -->
                <ma-button
                v-if="canPlayAll"
                type="accent"
                icon="play_circle_filled"
                title="playall"
                ></ma-button>

                <!-- follow / unfollow -->
                <ma-button
                v-if="canFollow"
                @click.native="setFollowing"
                v-tooltip="{ content: isFollowing ? $t('unfollow') : null, offset: 5 }"
                :icon="isFollowing ? 'check' : 'add_circle'"
                :title="isFollowing ? 'following' : 'follow'"
                ></ma-button>

                <!-- save -->
                <ma-button
                v-if="canSave"
                icon="save"
                title="save"
                ></ma-button>

                <!-- edit -->
                <ma-button
                v-if="canEdit"
                icon="edit"
                title="edit"
                ></ma-button>

                <!-- info items -->
                <div class="c-stage__info" v-if="info">
                    <div class="c-stage__infoItem" v-for="item in info">

                        <!-- info value -->
                        <h4 class="c-stage__infoItemValue">{{ item.value }}</h4>

                        <!-- info subtitle -->
                        <span class="c-stage__infoItemSubtitle">{{ item.subtitle }}</span>

                    </div>
                </div>
            </div>
        </div>

    </div>

    <!-- navigation-->
    <ma-navigation v-if="navigation.length" :items="navigation"></ma-navigation>
</div>
</template>

<script>
import { mapGetters } from 'vuex';
import {
  isFollowingArtistOrUser,
  isFollowingPlaylist,
  followArtistOrUser,
  followPlaylist,
} from '@/api/providers/spotify';
import maNavigation from '@/components/navigation';

export default {

  components: {
    maNavigation,
  },

  data: () => ({
    isFollowing: false,
  }),

  props: {
    title: {
      type: String,
      default: '',
    },
    subtitle: {
      type: String,
      default: '',
    },
    image: {
      type: Array,
      default: () => [],
    },
    artist: {
      type: Object,
      default: () => {},
    },
    meta: {
      type: String,
      default: '',
    },
    popularity: {
      type: Number,
      default: null,
    },
    buttons: {
      type: Object,
      default: () => {},
    },
    navigation: {
      type: Array,
      default: () => [],
    },
    profile: {
      type: [Object, Array],
      default: () => {},
    },
    info: {
      type: Array,
      default: () => [],
    },
  },

  created() {
    this.checkIfFollowing();
  },

  methods: {
    // check if the current user is following this artist / user
    checkIfFollowing() {
      const self = this,
        { isRoute } = self,
        { params } = self.$route,
        userId = self.currentUser.id;

      if (self.canFollow) {
        if (isRoute('artist') || isRoute('user')) {
          const type = isRoute('artist') ? 'artist' : 'user';

          isFollowingArtistOrUser({ type, ids: params.id })
            .then((res) => {
              [self.isFollowing] = res.data;
            });
        } else if (isRoute('playlist')) {
          isFollowingPlaylist({ ownerId: params.owner, playlistId: params.id, ids: userId })
            .then((res) => {
              [self.isFollowing] = res.data;
            });
        }
      }
    },

    // follow or unfollow this artist or user
    setFollowing() {
      const self = this,
        { isRoute } = self,
        { params } = self.$route;

      if (params.id && self.canFollow) {
        const type = isRoute('artist') ? 'artist' : 'user',
          action = self.isFollowing ? 'unfollow' : 'follow';

        if (isRoute('artist') || isRoute('user')) {
          followArtistOrUser({ action, type, ids: params.id })
            .then(() => {
              self.isFollowing = !self.isFollowing;
            });
        } else if (isRoute('playlist')) {
          followPlaylist({ action, ownerId: params.owner, playlistId: params.id })
            .then(() => {
              self.isFollowing = !self.isFollowing;
            });
        }
      }
    },

    // remove 'Cover:' from meta
    formatMeta(value) {
      let meta = value;
      const cover = 'Cover:',
        exp = new RegExp(cover),
        hasCoverMessage = exp.test(meta);

      if (typeof meta === 'string' && hasCoverMessage) [meta] = meta.split(cover);

      return meta;
    },

    // check if route contains routeName
    isRoute(routeName) {
      const self = this,
        exp = new RegExp(routeName),
        { name } = self.$route,
        isRoute = exp.test(name);

      return isRoute;
    },
  },

  computed: {
    ...mapGetters('user', {
      currentUser: 'getCurrentUser',
    }),

    // stage classes
    stageClasses() {
      const self = this;
      return {
        'is-large': self.isLarge,
        'c-stage--cover': self.hasCover,
        'c-stage--image': self.image.length,
        'c-stage--navigation': self.navigation.length,
      };
    },

    // check if stage is large
    isLarge() {
      const self = this,
        exp = /artist|mylibraryHistory/,
        { name } = self.$route,
        isLarge = exp.test(name);

      return isLarge;
    },

    // count words in title
    titleWordCount() {
      const self = this,
        { title } = self;

      return title.split(' ').length;
    },

    // check if title is large
    hasLargeTitle() {
      const self = this,
        { name } = self.$route,
        wordCount = self.titleWordCount,
        hasLargeTitle = wordCount < 4 && name === 'album';

      return hasLargeTitle;
    },

    // check if stage has cover
    hasCover() {
      const self = this,
        exp = /album|playlist/,
        { name } = self.$route,
        hasCover = exp.test(name) && self.image[0];

      return hasCover;
    },

    // check if stage has any actions
    hasActions() {
      const self = this,
        {
          canFollow, canPlayAll, canSave, canEdit,
        } = self,
        hasActions = canFollow || canPlayAll || canSave || canEdit;

      return hasActions;
    },

    // check if show follow button
    canFollow() {
      const self = this,
        exp = /artist|user|playlist/,
        { params, name } = self.$route,
        isOwner = params.owner === self.currentUser.id || params.id === self.currentUser.id,
        canFollow = params.id && !isOwner && exp.test(name);

      return canFollow;
    },

    // check if show play all button
    canPlayAll() {
      const self = this,
        exp = /playlist|artist|album|mylibraryTracks|mylibraryAlbums|mylibraryHistory/,
        { name } = self.$route,
        canPlayAll = exp.test(name);

      return canPlayAll;
    },

    // check if show save button
    canSave() {
      const self = this,
        exp = /album/,
        { name } = self.$route,
        canSave = exp.test(name);

      return canSave;
    },

    // check if show edit button
    canEdit() {
      const self = this,
        exp = /mylibraryTracks|mylibraryAlbums/,
        {
          name,
        } = self.$route,
        canEdit = exp.test(name);

      return canEdit;
    },

    // get the profile data from array or object
    getProfile() {
      const self = this,
        { profile } = self;

      let profileData;

      if (profile) {
        if (Array.isArray(profile)) {
          [profileData] = profile;
        } else {
          profileData = profile;
        }
      }

      return profileData;
    },
  },

};
</script>
