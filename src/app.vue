<template lang="pug">
#app(:class='{scrolled: $store.state.scrollPosition > 0}')

	// header
	ma-header

	// navigation
	ma-navigation

	// router view
	router-view(:key='$route.params.id')

	// footer
	transition(name='fade')
		ma-footer
	
	// tooltips
	.tooltip-container

	// loading spinner
	ma-loading.loading-container
		template(slot='spinner')
			ma-spinner

	// notices
	transition-group(name='slide', tag='notices')
		ma-notice(v-for='(notice, index) in $store.state.notices', :key='index', :message='notice', @remove="$store.commit('REMOVE_NOTICE', index)")
</template>

<script>
export default {
  created() {
	// fetch the data when the view is created and the data is
	// already being observed
	this.getCurrentUser();
	this.getMyDevices();
	this.showDevNotice();
  },
  methods: {

	// show development notice
	showDevNotice() {
	  this.$store.commit('ADD_NOTICE', 'This app is still work in progress. Contact me (microeinhundert) on github if you want to contribute to the development.');
	},

	// get the current user's info
	getCurrentUser() {
	  this.axios({
		method: 'get',
		url: '/me',
	  }).then((res) => {
		this.$store.commit('CURRENT_USER', res.data);
	  }).catch((err) => {
		this.$store.commit('CURRENT_USER', []);
		this.$store.commit('ADD_NOTICE', `Current user could not be fetched, please try again later. ${err}`);
	  });
	},

	// get the current device's ID
	getMyDevices() {
	  this.axios({
		method: 'get',
		url: '/me/player/devices',
	  }).then((res) => {
		this.$store.commit('DEVICE_ID', res.data.devices[0].id);
	  }).catch((err) => {
		this.$store.commit('DEVICE_ID', null);
		this.$store.commit('ADD_NOTICE', `Available devices could not be fetched, please try again later. ${err}`);
	  });
	},

	// get the current scroll position
	updateScroll() {
	  this.$store.commit('SCROLL_POSITION', window.scrollY);
	},
  },
  mounted() {
	window.addEventListener('scroll', this.updateScroll, {
	  passive: true,
	});
  },
  destroy() {
	window.removeEventListener('scroll', this.updateScroll, {
	  passive: true,
	});
  },
};
</script>

<style lang="scss">
body {
	font-family: 'Roboto', sans-serif;
	letter-spacing: 1px;
	background-color: $main-bg-color;
	color: $white;
	min-width: 611px;
	user-select: none;
	-webkit-user-select: none;
}

input {
	user-select: text;
	-webkit-user-select: text;
}

ol,
ul {
	padding: 0;
	margin: 0;
	list-style: none;
}

h1,
h2,
h3,
h4 {
	margin: 0;
	font-weight: 400;
}

h1 {
	font-family: 'Ubuntu', sans-serif;
	font-weight: 700;
	letter-spacing: 3px;
}

h2 {
	font-size: 1.2em;
	letter-spacing: 2px;
	text-transform: uppercase;
	color: rgba($white, 0.7);
}

a {
	&:active,
	&:link,
	&:visited {
		color: $white;
		text-decoration: none;
	}
}

.main-container {
	padding-bottom: 81px;
}

.page-container {
	display: flex;
	flex-direction: column;
	align-items: center;
}

.dropdown {
	position: absolute;
	width: 150px;
	top: 58px;
	right: 0;
	z-index: 999;
	border-radius: 5px;
	overflow: hidden;
	background-color: $dark-blue;

	li {
		padding: 15px;
		transition: background-color 0.3s;
		font-size: 0.9em;
		&:hover {
			background-color: $blue;
			cursor: pointer;
		}
	}
}

.btn {
	font-family: 'Ubuntu', sans-serif;
	font-weight: 700;
	display: inline-flex;
	margin: 0 5px 10px 0;
	padding: 13px;
	border-radius: 3px;
	background-color: $light-blue;
	font-size: 0.9em !important;
	letter-spacing: 1.5px;
	text-transform: uppercase;
	transition: background-color 0.3s, color 0.3s;
	&:hover {
		cursor: pointer;
	}
	&:not(.btn-transparent):hover {
		background-color: $white;
		color: $black;
	}
	&:not(.btn-icon) {
		i {
			margin-right: 5px;
		}
	}

	i {
		font-size: 1em;
		line-height: inherit;
	}

	&.btn-accent {
		background-color: $accent-color;
	}

	&.btn-transparent {
		background-color: transparent;
		box-shadow: none;
	}
}

.tooltip-container {
	.tooltip {
		display: block !important;
		font-family: 'Roboto', sans-serif;
		letter-spacing: 1px;
		font-size: 0.9em;
		z-index: 10000;
		padding: 4px;

		.tooltip-inner {
			background: $dark-blue;
			border-radius: 3px;
			padding: 5px 7px;
		}

		&[aria-hidden='true'] {
			visibility: hidden;
			opacity: 0;
			transition: opacity 0.15s, visibility 0.15s;
		}

		&[aria-hidden='false'] {
			visibility: visible;
			opacity: 1;
			transition: opacity 0.15s;
		}
	}
}

.scrolled {
	header {
		background-color: $dark-blue;
		border-color: $border-color;

		.header-inner {
			width: $small-width;
		}
	}
}
.main-container,
header {
	margin-left: 200px;
}
@media screen and (max-width: 955px) {
	.mobile-hidden {
		display: none !important;
	}
}

.fade-enter-active,
.fade-leave-active {
	transition: opacity 0.3s;
}

.fade-enter,
.fade-leave-to {
	opacity: 0;
}


.slide-enter-active,
.slide-leave-active {
	transition: transform 0.3s;
}

.slide-enter {
	transform: translateY(-100%);
}
.slide-enter-to {
	transform: translateY(0);
}

.slide-leave {
	transform: translateY(0);
}
.slide-leave-to {
	transform: translateY(-100%);
}

@keyframes fadeIn {
	from {
		opacity: 0;
	}

	to {
		opacity: 1;
	}
}
@keyframes zoomOut {
	0% {
		opacity: 0;
		transform: scale(1.1);
	}

	50% {
		opacity: 1;
	}

	100% {
		transform: scale(1);
	}
}
@keyframes fadeInBottom {
	from {
		transform: translateY(25px);
		opacity: 0;
	}

	to {
		transform: translateY(0);
		opacity: 1;
	}
}
@supports (backdrop-filter: blur(20px)) or (-webkit-backdrop-filter: blur(20px)) {
	.scrolled header,
	footer {
		background-color: rgba($dark-blue, 0.7) !important;
		backdrop-filter: saturate(200%) blur(20px);
		-webkit-backdrop-filter: saturate(200%) blur(20px);
	}
}

.header-inner,
.notice-inner,
.page-section,
.stage-inner {
	width: $large-width;
	max-width: 1440px;
	@media screen and (max-width: 1500px) {
		width: $small-width;
	}
}
</style>
