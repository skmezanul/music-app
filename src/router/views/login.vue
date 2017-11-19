<script>
import { mapActions } from 'vuex';

export default {
  created() {
    this.getToken();
  },
  methods: {
    ...mapActions(['GET_TOKEN']),

    // get code from query and exchange it for token
    getToken() {
      const self = this,
            { code } = self.$route.query,
            isToken = /^[AQ]{2}/.test(code);
      if (isToken) {
        self.GET_TOKEN({
          action: 'get',
          code,
        });
      }
    },
  },
};
</script>
