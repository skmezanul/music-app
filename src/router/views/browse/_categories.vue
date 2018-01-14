<template lang='pug'>
.view-content(v-if='!$isLoading("data")')
	// categories
	ma-section(:title='$tc("category", 0)')

		.section-items-container
			ma-item(
        v-for='(category, index) in $parent.data.categories.items',
        :key='category.id',
        type='category',
        :primaryid='category.id',
        :image='category.icons',
        :title='category.name')
</template>
