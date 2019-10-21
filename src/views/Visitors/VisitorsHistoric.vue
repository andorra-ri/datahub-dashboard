<template lang="html">
	<section :class="['card', 'card--round', { 'loading': loading }]">
		<h2><i class="icon mdi mdi-clock-outline" /> {{ $t('visitors.historic.title') }}</h2>
		<apex-chart
			type="bar"
			:options="chartOptions"
			:series="historicSeries"
			height="300" />
	</section>
</template>

<script>
import datahub from '@/api/datahub';
import ApexChart from 'vue-apexcharts';
import { apexOptions, mergeDeep } from '@/utils/charts/apexOptions';

const includes = (obj, key) => !obj.length || obj.includes(key);
const sumAllowed = allowed => (sum, [key, value]) => (includes(allowed, key) ? sum + value : sum);
const sumObject = (object, allowed) => Object.entries(object).reduce(sumAllowed(allowed), 0);

export default {
	name: 'visitors-historic',
	components: { ApexChart },
	props: {
		dates: { type: Object, required: true },
		filters: { type: Object, default: () => {} },
	},
	data() {
		return {
			loading: false,
			historic: [],
			chartOptions: mergeDeep(apexOptions.column, {
				chart: { stacked: true },
				tooltip: { intersect: true, shared: false },
				plotOptions: { bar: { columnWidth: '20%' } },
				xaxis: { type: 'datetime' },
			}),
		};
	},
	computed: {
		historicSeries() {
			const { countries: allowCountries } = this.filters;
			return Object.values(this.historic.reduce((acc, { date, groups }) => {
				groups.forEach(({ group, countries }) => {
					const name = this.$t(`visitors.group.${group}`);
					acc[group] = acc[group] || { name, data: [] };
					acc[group].data.push({ x: date, y: sumObject(countries, allowCountries) });
				});
				return acc;
			}, {}));
		},
	},
	watch: {
		dates: {
			immediate: true,
			handler({ since, until }) {
				const endpoint = `/visitors/historic?since=${since}&until=${until}`;
				this.loading = true;
				datahub.get(endpoint).then(({ data: { dates } }) => {
					this.historic = dates;
					this.loading = false;
				});
			},
		},
	},
};
</script>
