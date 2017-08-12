<template lang="pug">
header
	.header-inner
		// navigation
		.header.left
			i.material-icons(@click='goBack') keyboard_arrow_left

			i.material-icons(@click='goForward') keyboard_arrow_right
		// search
		.header.center
			i.material-icons.search-icon search
			input(type='text', @keyup.enter='fireSearch', v-model='searchQuery', placeholder='Search')
			
		// current user
		.header.right
			img.user-avatar.mobile-hidden(:src='$store.state.currentUser.images[0].url', :alt='$store.state.currentUser.display_name')
			router-link.user-name.mobile-hidden(to='/') {{ $store.state.currentUser.display_name }}
			i.toggle.material-icons(@click='toggleDropdown') keyboard_arrow_down
			// user dropdown
			ul.dropdown(v-if='userDropdown', v-on-clickaway='toggleDropdown')
				li My Account
				li Settings
				li Log Out
</template>

<script>
import {
	directive as onClickaway,
} from 'vue-clickaway';

export default {
	data() {
	return {
		userDropdown: false,
		searchQuery: null,
	};
	},
	methods: {
	fireSearch() {
		this.$router.push({
		path: `/search/${this.searchQuery}`,
		});
	},
	goBack() {
		this.$router.go(-1);
	},
	goForward() {
		this.$router.go(1);
	},
	toggleDropdown() {
		this.userDropdown = !this.userDropdown;
	},
	},
	directives: {
	onClickaway,
	},
};
</script>

<style lang="scss">
header {
	display: flex;
	justify-content: center;
	border-bottom: 1px solid;
	border-color: transparent;
	background-color: transparent;
	position: fixed;
	top: 0;
	right: 0;
	left: 0;
	z-index: 999;
	padding: 13px 0;
	transition: background-color 0.3s, border-color 0.3s;
	-webkit-app-region: drag;

	.header-inner {
		display: flex;
		justify-content: space-between;
		@media screen and (max-width: 955px) {
			width: 95%;
		}
		transition: width 0.3s;
		will-change: width;
		height: 42px;

		.header {
			display: flex;
			align-items: center;

			&.left {
				@media screen and (min-width: 955px) {
					justify-content: flex-start;
					flex: 1;
				}

				i {
					font-size: 2.2em;
					@include item-hover;
				}
			}

			&.center {
				margin: 0 10px;
				position: relative;
				@media screen and (max-width: 955px) {
					width: 100%;
				}
				@media screen and (min-width: 955px) {
					flex: 2;
				}
				input {
					border: none;
										transition: background-color 0.3s, box-shadow 0.3s;
					padding: 12px 12px 12px 50px;
					box-sizing: border-box;
					background-color: rgba($white,0.1);
					z-index: 1;
					width: 100%;
					color: $white;
					border-radius: 5px;
					letter-spacing: 1.3px;
					outline: 0;

										&:focus {
											background-color: rgba($white,0.2);
											box-shadow: $shadow;
										}

					&::-webkit-input-placeholder {
						color: rgba($white,0.4);
					}
				}
				.search-icon {
					color: rgba($white, 0.5);
					position: absolute;
					left: 17px;
					top: 9px;
					z-index: 2;
				}
				.search-dropdown {
					position: absolute;
					top: 42px;
					left: 0;
					right: 0;
					z-index: 999;
					max-height: 500px;
					padding: 20px;
					box-sizing: border-box;
					border: 1px solid $border-color;
					background-color: lighten($dark-blue, 3%);
					box-shadow: $shadow;
					border-radius: 0 0 5px 5px;
					overflow-y: auto;
				}
			}

			&.right {
				position: relative;
				@media screen and (min-width: 955px) {
					justify-content: flex-end;
					flex: 1;
				}

				.user-avatar {
					border-radius: 100%;
					height: 34px;
					width: 34px;
				}

				.user-name {
					padding: 0 10px;
				}

				i {
					@include item-hover;
				}
			}
		}
	}
}
</style>
