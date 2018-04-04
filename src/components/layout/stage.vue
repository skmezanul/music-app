<template>
<div class="c-stage" :class="stageClasses">

    <!-- background image -->
    <transition v-if="image[0]" name="zoom-out" appear>

        <div class="c-stage__background">

            <figure
            class="c-stage__backgroundImage"
            :style="{ backgroundImage : `url('${image[0].url}')`}"
            ></figure>

        </div>

    </transition>

    <div class="c-stage__inner">

        <!-- cover -->
        <div class="c-stage__cover" v-if="hasCover && image[0]">

            <!-- cover image -->
            <img class="c-stage__coverImage" v-lazy="image[0].url" :alt="title" />

        </div>

        <!-- content -->
        <div class="c-stage__content">

            <!-- subtitle -->
            <div class="c-stage__subtitle">

                <h4 v-if="subtitle">

                    <span>{{ profile ? `${subtitle || stage.subtitle} ${$t('by')} ` : subtitle }}</span>

                    <router-link
                    class="c-stage__subtitleLink"
                    v-if="profile"
                    :to="{ name: profile.type, params: { id: profile.id } }"
                    >

                    {{ profile.name || profile.display_name }}

                    </router-link>
                </h4>

                <!-- icon if popular -->
                <ma-icon class="c-stage__popularIcon" v-if="popularity && popularity > 80">stars</ma-icon>
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
                v-tooltip="{ content: isFollowing ? $t('unfollow') : null }"
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
    <nav class="c-stage__navigation" v-if="navigation">
        <ul class="c-stage__navigationList">

            <li class="c-stage__navigationItem" v-for="navitem in navigation">

                <!-- item link -->
                <router-link
                class="c-stage__navigationItemLink"
                :to="{ name: navitem.routeName, params: { id: $route.params.id }}"
                >

                {{ navitem.title }}

                </router-link>

            </li>

        </ul>
    </nav>
</div>
</template>

<script>
import { mapGetters } from 'vuex';

export default {

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
      type: Object,
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
        api = self.$api,
        userId = self.currentUser.id;

      if (self.canFollow) {
        if (isRoute('artist') || isRoute('user')) {
          const type = isRoute('artist') ? 'artist' : 'user';

          api.isFollowingArtistOrUser(type, params.id)
            .then((res) => {
              [self.isFollowing] = res.data;
            });
        } else if (isRoute('playlist')) {
          api.isFollowingPlaylist(params.owner, params.id, userId)
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
        { params } = self.$route,
        api = self.$api;

      if (params.id && self.canFollow) {
        const type = isRoute('artist') ? 'artist' : 'user',
          action = self.isFollowing ? 'unfollow' : 'follow';

        if (isRoute('artist') || isRoute('user')) {
          api.followArtistOrUser(action, type, params.id)
            .then(() => {
              self.isFollowing = !self.isFollowing;
            });
        } else if (isRoute('playlist')) {
          api.followPlaylist(action, params.owner, params.id)
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
        hasCover = exp.test(name);

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
  },

};
</script>
