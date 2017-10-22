<template lang="pug">
.page-container
	// categories
	ma-section(:title='$tc("category", 0)')

		.section-items-container
			ma-item(
        v-for='category in $parent.data.categories.items',
        type="category",
        :key='category.id',
        :primaryid='category.id',
        :image='category.icons[0].url',
        :title='category.name')
</template>
