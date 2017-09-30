<template lang="pug">
main.main-container
	// stage
	ma-stage(
	:subtitle='$tc("user", 1)',
  :navigation='navigation',
	:image='user.images[0].url',
	:title='user.display_name',
	:meta='`${user.followers.total} ${$tc("follower", 0)}`')
</template>

<script>
export default {
  data() {
    return {
      user: [],
      navigation: [{
          title: this.$t('overview'),
          name: 'user',
        },
        {
          title: this.$tc('playlist', 0),
          name: 'userPlaylists',
        },
        {
          title: `${this.$t('following')} (2)`,
          name: 'userFollowing',
        },
      ],
    };
  },
  created() {
    // fetch the data when the view is created and the data is
    // already being observed
    this.getUser();
  },
  methods: {
    // get playlist from the api
    getUser() {
      const that = this;

      that.$startLoading('fetching data');
      that.axios({
        method: 'get',
        url: `/users/${that.$route.params.id}`,
      }).then((res) => {
        that.user = res.data;
        that.$endLoading('fetching data');
      });
    },
  },
};
</script>
