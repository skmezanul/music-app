<template lang="pug">
.view-parent(v-if='!$isLoading("data")')
	// stage
	ma-stage
</template>

<script>
import { mapMutations } from 'vuex';

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
    this.fetchData();
  },
  methods: {
    ...mapMutations({
      setStage: 'SET_STAGE',
    }),

    fetchData() {
      const that = this;
      that.$startLoading('data');

      that.axios.all([
          that.getUser(),
        ]).then((res) => {
          that.user = res[0].data;
          // init stage
          that.setStage({
            size: 'compact',
            cover: 'small',
            navigation: that.navigation,
            image: res[0].data.images[0].url,
            subtitle: that.$tc('user', 1),
            title: res[0].data.display_name,
            buttons: [{
              title: 'follow',
              icon: 'add_circle',
            }]
          });
          that.$endLoading('data');
        });
    },

    // get user from the api
    getUser() {
      const that = this;

      return that.$spotifyApi({
        method: 'get',
        url: `/users/${that.$route.params.id}`,
      });
    },
  },
};
</script>
