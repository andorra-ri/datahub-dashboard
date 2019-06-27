<template lang="html">
	<section :class="['card', 'card--round', { 'loading': loading }]">
		<h2><i class="icon mdi mdi-clock-outline" /> {{ $t('visitors.historic.title') }}</h2>
		<apex-chart
			type="bar"
			:options="chartOptions"
			:series="historic"
			height="300" />
	</section>
</template>

<script>
import datahub from '@/api/datahub';
import ApexChart from 'vue-apexcharts';
import { apexOptions, mergeDeep } from '@/utils/charts/apexOptions';

const sumObjectParams = object => Object.values(object).reduce((sum, value) => sum + value, 0);

export default {
	name: 'visitors-historic',
	components: { ApexChart },
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
	methods: {
		loadHistoric() {
			this.loading = true;
			datahub.get('/visitors/historic').then(({ data: { dates } }) => {
				this.historic = Object.values(dates.reduce((acc, { date, groups }) => {
					groups.forEach(({ group, countries }) => {
						acc[group] = acc[group] || {
							name: this.$t(`visitors.group.${group}`),
							data: [],
						};
						acc[group].data.push({ x: date, y: sumObjectParams(countries) });
					});
					return acc;
				}, {}));
				this.loading = false;
			});
		},
	},
	mounted() { this.loadHistoric(); },
};
</script>
