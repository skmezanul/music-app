<template lang='pug'>
.view-parent
	p Coming Soon...
</template>

<script>
export default {
  created() {
    this.watchData();
  },
  data() {
    return {
      listening: [],
    };
  },
  methods: {
    watchData() {
      this.$database.collection('users')
        .onSnapshot((querySnapshot) => {
          querySnapshot.forEach((doc) => {
            this.listening.push(doc.data());
          });
        });
    },
  },
};
</script>
