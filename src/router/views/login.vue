<template lang='pug'>
p Logging in...
</template>

<script>
import { mapActions } from 'vuex';

export default {

  created() {
    this.getTokenFromURL();
  },

  methods: {
    ...mapActions({
      getToken: 'auth/GET_TOKEN',
    }),

    // get code from query and exchange it for token
    getTokenFromURL() {
      const self = this,
        { code } = self.$route.query,
        isToken = /^[AQ]{2}/.test(code);

      if (isToken && code) {
        self.getToken({
          action: 'get',
          code,
        });
      }
    },
  },

};
</script>
