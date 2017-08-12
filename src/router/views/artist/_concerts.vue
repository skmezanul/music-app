<template lang="pug">
.page-container
	// concerts
	ma-section(title='2018', :collapsible='false')
		ma-event(v-for='concert in concerts', :key='concert.venue', :image='concert.image', :month='concert.month', :day='concert.day', :city='concert.city', :country='concert.country', :venue='concert.venue')
</template>

<script>
export default {
	data() {
		return {
			concerts: [{
				image: '/static/images/bråvalla.jpg',
				month: 'jul',
				day: '01',
				city: 'Norrköping',
				country: 'Sweden',
				venue: 'Bråvalla festival',
			}],
		};
	},
};
</script>
