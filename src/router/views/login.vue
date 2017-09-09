<template lang="pug">
main.main-container
  ma-splash(:title='$t("loginwithspotify")')
    img(slot='image', src='/static/images/spotify_logo.png', draggable='false')
    a.btn.btn-accent(slot='button', @click='login') {{ $t("continuetospotify") }}
</template>

<script>
import { toLogin, getToken} from '@/api/helpers';

export default {
  created() {
    getToken();
  },
  methods: {
    // get playlist from the api
    login() {
      toLogin();
    },
  },
};
</script>
