<template lang='pug'>
.view-parent
  ul
    router-link(
      v-for='item in items',
       :key='item.name',
       tag='li',
      :to='{ name: item.routeName }',
      @click.native='$emit("clicked-element", $event)')
      span.title {{ item.name }}
      .meta-container
        span(v-if='item.meta') {{ item.meta }}
</template>

<script>
export default {
  data() {
    return {
      items: [{
        name: 'Create new playlist',
        routeName: 'browse',
        meta: 'Create a new playlist',
      },
      ],
    };
  },
};
</script>
