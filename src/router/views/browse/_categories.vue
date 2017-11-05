<template lang="pug">
.view-content
	// categories
	ma-section(:title='$tc("category", 0)')

		.section-items-container
			ma-item(
        v-for='category in $parent.data.categories.items',
        type="category",
        :key='category.id',
        :primaryid='category.id',
        :image='category.icons',
        :title='category.name')
</template>
