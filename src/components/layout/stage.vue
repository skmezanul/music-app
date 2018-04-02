<template
>
<div class="c-stage" :class="stageClasses">

    <!-- background image -->
    <transition v-if="image[0]" name="zoom-out" appear="appear">

        <div class="c-stage__background">

            <figure
            class="c-stage__backgroundImage"
            :style="{ backgroundImage : `url('${image[0].url}')`}"
            ></figure>

        </div>

    </transition>

    <div class="c-stage__inner">

        <!-- cover -->
        <div class="c-stage__cover" v-if="$route.meta.stage.cover && image[0]">

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
            :class="{ 'is-large' : titleWordCount < 4 && $route.name === 'album' }"
            >

            {{ title }}

            </h1>

            <!-- meta -->
            <div class="c-stage__meta" v-if="meta">
                <p v-html="formatMeta(meta)"></p>
            </div>

            <!-- actions -->
            <div class="c-stage__actions" v-if="buttons">

                <!-- play all -->
                <ma-button
                v-if="buttons.playall"
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
                v-if="buttons.save"
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
export default {

  data: () => ({
    isFollowing: [],
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
        { params, name } = self.$route,
        isArtist = /artist/.test(name);

      if (self.canFollow) {
        self.$api.isFollowing(isArtist ? 'artist' : 'user', params.id)
          .then((res) => {
            [self.isFollowing] = res.data;
          });
      }
    },

    // follow or unfollow this artist or user
    setFollowing() {
      const self = this,
        {
          name,
          params,
        } = self.$route,
        isArtist = /artist/.test(name);

      if (params.id && self.canFollow) {
        self.$spotifyApi({
          method: 'put',
          url: '/me/following',
          params: {
            type: isArtist ? 'artist' : 'user',
            ids: params.id,
          },
        });
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
  },

  computed: {
    // stage classes
    stageClasses() {
      const self = this;
      return {
        'is-large': self.isLarge,
        'c-stage--cover': self.hasCover,
        'c-stage--image': self.image,
        'c-stage--navigation': self.navigation,
      };
    },

    // check if stage is large
    isLarge() {
      const self = this,
        { meta } = self.$route,
        isLarge = meta.stage.large;

      return isLarge;
    },

    // count words in title
    titleWordCount() {
      const self = this,
        { title } = self;

      return title.split(' ').length;
    },

    // check if stage has cover
    hasCover() {
      const self = this,
        { meta } = self.$route,
        hasCover = meta.stage.cover;

      return hasCover;
    },

    // check if show follow button
    canFollow() {
      const self = this,
        exp = /artist|user/,
        { params, name } = self.$route,
        canFollow = params.id && exp.test(name);

      return canFollow;
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
