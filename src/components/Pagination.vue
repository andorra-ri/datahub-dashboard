<template lang="html">
  <ul class="pagination">
		<li v-for="i in pages" :key="i">
			<span :class="{ 'selected': i === value + 1 }" @click="selectPage(i)" />
		</li>
	</ul>
</template>

<script>
export default {
	name: 'pagination',
	props: {
		pages: { type: Number, required: true },
		value: { type: Number, required: true },
	},
	watch: {
		pages(pages) {
			if (this.value > pages) this.$emit('input', pages - 1);
		},
	},
	methods: {
		selectPage(i) {
			this.$emit('input', i - 1);
		},
	},
};
</script>

<style lang="scss" scoped>
.pagination {
	margin-top: 20px;
	text-align: center;

	li {
		display: inline-block;
		margin: 0 5px;
		vertical-align: middle;

		span {
			display: block;
			height: 9px;
			width: 9px;
			border-radius: 50%;
			background: rgba(#461ea3, 0.5);
			cursor: pointer;
			transition: all 0.2s ease-in-out;

			&.selected {
				background: #461ea3;
				transform: scale(1.2);
			}
		}
	}
}
</style>
