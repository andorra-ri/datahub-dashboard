<template lang="html">
	<div class="ranking">
		<table class="ranking__list">
			<tr v-for="item in rankedList" :key="item._rank">
				<td class="ranking__rank">{{ item._rank }}</td>
				<td class="ranking__name">
					<slot :item="item">{{ item.name }}</slot>
				</td>
				<td v-if="showValues" class="ranking__value">
					{{ unitPrefix }}{{ rankAttribute(item) }}{{ unitSuffix }}
				</td>
				<td v-if="selectable" class="ranking__more">
					<i class="selector mdi mdi-chevron-right" @click="select(item)" />
				</td>
			</tr>
		</table>
		<pagination v-if="pagination" :pages="numPages" v-model="page" />
	</div>
</template>

<script>
import Pagination from '@/components/Pagination.vue';

const resolve = (path, obj = this, separator = '.') => {
	const properties = Array.isArray(path) ? path : path.split(separator);
	return properties.reduce((prev, curr) => prev && prev[curr], obj);
};

export default {
	name: 'ranking',
	components: { Pagination },
	props: {
		list: { type: Array, required: true },
		ranker: { type: String, required: true },
		pagination: { type: Number, default: 0 },
		showValues: { type: Boolean, default: true },
		selectable: { type: Boolean, default: false },
		unitPrefix: { type: String, default: '' },
		unitSuffix: { type: String, default: '' },
	},
	data() {
		return { page: 0 };
	},
	computed: {
		rankedList() {
			const offset = this.page * this.pagination;
			return [...this.list]
				.sort((a, b) => {
					const aAttribute = this.rankAttribute(a);
					const bAttribute = this.rankAttribute(b);
					const numeric = typeof aAttribute === 'number' || typeof bAttribute === 'number';
					return numeric
						? bAttribute - aAttribute
						: aAttribute.localeCompare(bAttribute);
				})
				.map((item, i) => ({ ...item, _rank: i + 1 }))
				.slice(offset, this.pagination ? offset + this.pagination : this.list.length);
		},
		max() {
			return this.list.reduce((max, item) => {
				const attribute = this.rankAttribute(item);
				return attribute > max ? attribute : max;
			}, 0);
		},
		numPages() { return Math.ceil(this.list.length / this.pagination); },
	},
	methods: {
		rankAttribute(obj) { return resolve(this.ranker, obj); },
		select(item) { this.$emit('select', item); },
	},
};
</script>

<style lang="scss" scoped>
.ranking {
	&__list {
		width: 100%;
		margin: 10px 0;

		tr + tr { border-top: 1px solid #e7e9f1; }

		td {
			width: auto;
			padding: 7px;
			vertical-align: middle;
		}
	}

	&__rank,
	&__more {
		font-size: 0.9em;
		color: #aaa;
		width: 1% !important;
		white-space: nowrap;
	}

	&__value {
		text-align: right;
		font-weight: bold;
		width: 40% !important;
		color: #461ea3;
		font-size: 0.8em;
		white-space: nowrap;
	}

	.selector {
		cursor: pointer;
	}
}
</style>
