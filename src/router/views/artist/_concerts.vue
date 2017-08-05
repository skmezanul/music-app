<template>
<div class="page-container">
  <section class="page-section nearyou">
    <div class="section-header">
      <h1>2018</h1>
    </div>
    <eventcard
    v-for="concert in concerts"
    :key="concert.venue"
    :image="concert.image"
    :month="concert.month"
    :day="concert.day"
    :city="concert.city"
    :country="concert.country"
    :venue="concert.venue"
    ></eventcard>
  </section>
</div>
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
      },
      ],
    };
  },
};
</script>
