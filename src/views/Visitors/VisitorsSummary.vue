<template lang="html">
  <section :class="['card', 'card--round', { 'loading': loading }]">
		<div class="row">
			<div v-for="(item, name) in summary" :key="name" class="column summary__item">
				<h4>{{ $t(`visitors.group.${name}`) }}</h4>
				<strong>{{ item.value | minorize }}</strong>
				<em>{{ $t(`visitors.unit.${item.unit}`) }}</em>
			</div>
		</div>
	</section>
</template>

<script>
import datahub from '@/api/datahub';

export default {
	name: 'visitors-summary',
	filters: {
		minorize(value) {
			const isMillion = value > 1000000;
			const rounded = Math.round((isMillion ? value / 1000000 : value) * 100) / 100;
			return isMillion ? `${rounded}M` : rounded;
		},
	},
	props: {
		dates: { type: Object, required: true },
		filters: { type: Object, default: () => {} },
	},
	data() {
		return {
			loading: false,
			countries: [],
		};
	},
	computed: {
		summary() {
			const { countries } = this.filters;
			return this.countries
				.filter(({ code }) => !countries.length || countries.includes(code))
				.reduce((acc, { visitors, visits, spending }) => {
					acc.visitors.value += visitors.uniques;
					acc.trippers.value += visitors.trippers;
					acc.tourists.value += visitors.tourists;
					acc.visits.value += visits.tourists + visits.trippers;
					acc.spending.value += spending.mean * visitors.uniques;
					return acc;
				}, {
					visitors: { value: 0, unit: 'people' },
					trippers: { value: 0, unit: 'people' },
					tourists: { value: 0, unit: 'people' },
					visits: { value: 0, unit: 'visits' },
					spending: { value: 0, unit: 'euro' },
				});
		},
	},
	watch: {
		dates: {
			immediate: true,
			handler({ since, until }) { this.fetchSummary(since, until); },
		},
	},
	methods: {
		fetchSummary(since, until) {
			const endpoint = `/visitors/summary?since=${since}&until=${until}`;
			this.loading = true;
			datahub.get(endpoint).then(({ data }) => {
				this.countries = data;
				this.loading = false;
			});
		},
	},
};
</script>

<style lang="scss" scoped>
.summary__item {
	h4 {
		text-transform: uppercase;
		font-size: 0.8em;
		line-height: 1.5em;
		color: #999;
	}

	strong {
		font-size: 1.8em;
		line-height: 1em;
	}

	em {
		font-size: 0.8em;
		margin-left: 3px;
		display: block;
		white-space: nowrap;
	}
}
</style>
