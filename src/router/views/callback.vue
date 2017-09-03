<script>
export default {
  created() {
    // get the access token when the view is created and the data is
    // already being observed
    this.getTokenFromUrl();
  },
  methods: {
    checkToken() {
      if (!localStorage.getItem('spotify_token')) {
        this.getTokenFromUrl();
      }
    },
    getTokenFromUrl() {
      const that = this;
      const url = window.location.href;
      const token = url.split('&token_type')[0].split('access_token=')[1];
      localStorage.setItem('spotify_token', token);
      that.$router.push({ name: 'browse'});
      that.$store.commit('ADD_NOTICE', that.$t('notices.loggedin'));
    },
  },
}
</script>
