<template lang="pug">
main.main-container
	// stage
	ma-stage(
	subtitle='User',
	:image='user.images[0].url',
	:title='user.display_name',
	:meta='`${user.followers.total} Followers`')
</template>

<script>
export default {
  data() {
    return {
      user: [],
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
