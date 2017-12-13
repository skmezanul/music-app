<template lang='pug'>
.view-parent
  // stage
  ma-stage(v-show='!$isLoading("data")')

  // router view
  router-view(v-if='!$isLoading("data")')
</template>

<script>
import { mapMutations } from 'vuex';

export default {
  data() {
    return {
      user: [],
    };
  },
  created() {
    // fetch the data when the view is created and the data is
    // already being observed
    this.fetchData();
  },
  methods: {
    ...mapMutations({
      setStage: 'SET_STAGE',
    }),

    fetchData() {
      const self = this;
      self.$startLoading('data');

      self.axios.all([
        self.getUser(),
      ]).then((res) => {
        const user = res[0].data,
          followerCount = user.followers.total,
          stageImage = user.images[0].url;

        self.user = user;
        // init stage
        self.setStage({
          image: stageImage,
          subtitle: self.$tc('user', 1),
          title: user.display_name,
          navigation: [{
            title: self.$t('overview'),
            routeName: 'user',
          },
          {
            title: self.$tc('playlist', 0),
            routeName: 'userPlaylists',
          },
          {
            title: `${self.$t('following')}`,
            routeName: 'userFollowing',
          },
          ],
          buttons: {
            follow: true,
            share: true,
          },
          info: [{
            value: followerCount.toLocaleString(),
            subtitle: self.$tc('follower', followerCount > 1 ? 0 : 1),
          },
          ],
        });
        self.$endLoading('data');
      });
    },

    // get user from the api
    getUser() {
      const self = this;

      return self.$spotifyApi({
        method: 'get',
        url: `/users/${self.$route.params.id}`,
      });
    },
  },
};
</script>
