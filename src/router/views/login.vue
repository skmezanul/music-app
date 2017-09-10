<template lang="pug">
main.main-container
  ma-splash(:title='$t("loginwithspotify")')
    img(slot='image', src='/static/images/spotify_logo.png', draggable='false')
    ma-button(slot='button', @click.native='login', type='accent', title='continuetospotify')
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
