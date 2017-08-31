<template lang="pug">
main.main-container
	// stage
	ma-stage(
	:title='$t("settings")',
	:image='$store.state.currentUser.images[0].url')
</template>
