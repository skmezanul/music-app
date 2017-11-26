<template lang="pug">
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
        self.user = res[0].data;
        // init stage
        self.setStage({
          image: res[0].data.images[0].url,
          subtitle: self.$tc('user', 1),
          title: res[0].data.display_name,
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
            value: res[0].data.followers.total.toLocaleString(),
            subtitle: self.$tc('follower', 0),
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
