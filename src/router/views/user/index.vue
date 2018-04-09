<template lang='pug'>
api-request.o-view__parent(:resource='dataToFetch', v-model='response')

  // stage
  ma-stage(
    v-if='response.user',
    :image='response.user.images',
    :subtitle='$tc("user", 1)',
    :title='response.user.display_name',
    :navigation='getNavigation',
    :info='getInfo')

  // router view
  transition(name='fade', mode='out-in')
    keep-alive
      router-view(:parent-data='response')
</template>

<script>
export default {

  data: () => ({
    response: {},
  }),

  computed: {
    // get data to fetch from api
    dataToFetch() {
      const self = this,
        api = self.$api,
        { id } = self.$route.params;

      return {
        user: () => api.getUser({ id }),
      };
    },

    // get stage navigation
    getNavigation() {
      const self = this;

      return [{
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
      }];
    },

    // get stage info
    getInfo() {
      const self = this,
        { user } = self.response,
        followerCount = user.followers.total;

      return [{
        value: followerCount.toLocaleString(),
        subtitle: self.$tc('follower', followerCount === 1 ? 1 : 0),
      }];
    },
  },

};
</script>
