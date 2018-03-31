<template lang='pug'>
.view-content

	// categories
	ma-section(:title='$tc("category", 0)')

		.section-items-container
			ma-item(
        v-for='category in parentData.categories.categories.items',
        :key='category.id',
        type='category',
        :primaryid='category.id',
        :image='category.icons',
        :title='category.name')
</template>

<script>
export default {

  props: {
    parentData: {
      type: Object,
      required: true,
    },
  },

};
</script>
