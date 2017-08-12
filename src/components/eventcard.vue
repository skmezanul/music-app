<template lang="pug">
.event-card
	.container.left
		h1 {{ month }}
		h1 {{ day }}
	.container.right
		.right-inner
			.date
				a {{ month }}
				a {{ day }}
			.location
				a {{ city }}
				a {{ country }}
			h1 {{ venue }}
			.button-container
				a.btn
					i.material-icons event_available
					| Buy Tickets
				a.btn.btn-transparent
					i.material-icons share
					| Share
		.image-container
			img(:src='image', :alt='venue')
</template>

<script>
export default {
	props: [
		'month',
		'day',
		'city',
		'country',
		'venue',
		'image',
	],
};
</script>

<style lang="scss">
.event-card {
		margin-bottom: 14px;
		box-shadow: $shadow;
		display: flex;
		height: 250px;
		background-color: $blue;
		.container {
				display: flex;
				flex-direction: column;
				padding: 30px;
				&.left {
						text-transform: uppercase;
						flex: 1;
						align-items: center;
						justify-content: center;
						@media screen and (max-width: 955px) {
								display: none;
						}
						h1 {
								font-size: 2.5em;
								line-height: 1em;
								&:last-of-type {
										font-size: 5em;
								}
						}
				}
				&.right {
						flex: 5;
						position: relative;
						.right-inner {
								z-index: 1;
								display: flex;
								flex-direction: column;
								justify-content: space-between;
								height: 100%;
								h1 {
										hyphens: auto;
										margin-top: 5px;
										@media screen and (min-width: 955px) {
												font-size: 3em;
												margin-left: -4px;
										}
								}
								.date {
										margin-bottom: 5px;
										@media screen and (min-width: 955px) {
												display: none;
										}
										a {
												text-transform: uppercase;
												@include comma-separated(1.2em, 400);
										}
								}
								.location {
										a {
												text-transform: uppercase;
												@include comma-separated(1.2em, 400);
										}
								}
								.button-container {
										margin-top: auto;
										a {
												margin: 0;
										}
								}
						}
						.image-container {
								position: absolute;
								top: 0;
								left: 0;
								right: 0;
								bottom: 0;
								overflow: hidden;
								display: flex;
								align-items: center;
								img {
										filter: brightness(40%) saturate(130%);
										width: 100%;
										height: auto;
								}
						}
				}
		}
}
</style>
