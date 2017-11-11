<template lang="pug">
.view-content(v-if='!$isLoading("data")')
  // about this artist
  ma-section(:title='`${$t("about")} ${$parent.data.artistInfo.name}`')
    img(:src='$parent.data.additionalInfo.headerImages[1].url', :alt='$parent.data.artistInfo.name')
    p.biography(v-html='$parent.data.additionalInfo.bio')
</template>
