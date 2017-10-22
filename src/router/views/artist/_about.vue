<template lang="pug">
.page-container
	// about this artist
	ma-section(:title='`${$t("about")} ${$parent.data.artistInfo.name}`')
		p.biography(v-html='$parent.data.additionalInfo.bio')
</template>
