<template lang='pug'>
.view-content(v-if='!$isLoading("data")')
  // about this artist
  ma-section(:title='`${$t("about")} ${$parent.data.artistInfo.name}`')
    p.biography(v-html='$parent.data.additionalInfo.bio')
</template>
