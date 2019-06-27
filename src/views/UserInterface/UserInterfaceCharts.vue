<template lang="html">
	<section class="card card--round">
		<h2>{{ $t('ui.chart.title') }}</h2>
		<div class="grid">
			<div class="row">

				<!-- Lines -->
				<div class="column col-4">
					<h3>{{ $t('ui.chart.type.line') }}</h3>
					<apex-chart
						type="line"
						:options="options.line"
						:series="series"
						height="300" />
				</div>

				<!-- Columns -->
				<div class="column col-4">
					<h3>{{ $t('ui.chart.type.columns') }}</h3>
					<apex-chart
						type="bar"
						:options="options.columnStack"
						:series="dateSeries"
						height="300" />
				</div>

				<div class="column col-4">
					<h3>{{ $t('ui.chart.type.area') }}</h3>
					<apex-chart
						type="area"
						:options="options.area"
						:series="dateSeries"
						height="300" />
				</div>

			</div>
			<div class="row">

				<!-- Donut -->
				<div class="column col-4">
					<h3>{{ $t('ui.chart.type.donut') }}</h3>
					<apex-chart
						type="donut"
						:options="options.donut"
						:series="serialSeries" />
				</div>

				<!-- Heatmap -->
				<div class="column col-8">
					<h3>{{ $t('ui.chart.type.heatmap') }}</h3>
					<apex-chart
						type="heatmap"
						:options="options.heatmap"
						:series="series"
						height="250" />
				</div>

			</div>
		</div>
	</section>
</template>

<script>
import ApexChart from 'vue-apexcharts';
import { apexOptions, mergeDeep } from '@/utils/charts/apexOptions';

const getDates = (start, end) => {
	const dates = [];
	const date = new Date(start);
	const endDate = new Date(end);
	while (date <= endDate) {
		dates.push(new Date(date));
		date.setDate(date.getDate() + 1);
	}
	return dates;
};

const NUM_SERIES = 3;
const NUM_CATEGORIES = 10;
const series = Array.from(Array(NUM_SERIES).keys()).map(key => `Serie ${key + 1}`);
const categories = Array.from(Array(NUM_CATEGORIES).keys()).map(key => `Cat ${key + 1}`);
const dates = getDates('2017-01-02', '2017-01-10');

export default {
	name: 'user-interface-charts',
	components: { ApexChart },
	data() {
		return {
			options: {
				line: apexOptions.line,
				columnStack: mergeDeep(apexOptions.column, {
					chart: { stacked: true },
					tooltip: { intersect: true, shared: false },
					plotOptions: { bar: { columnWidth: '20%' } },
					xaxis: { type: 'datetime' },
				}),
				donut: mergeDeep(apexOptions.donut, { labels: series }),
				heatmap: apexOptions.heatmap,
				area: mergeDeep(apexOptions.area, {
					chart: { stacked: true },
					xaxis: { type: 'datetime' },
				}),
			},
		};
	},
	computed: {
		series() {
			return series.map(serie => ({
				name: serie,
				data: categories.map(x => ({ x, y: Math.random() * 100 })),
			}));
		},
		dateSeries() {
			return series.map(serie => ({
				name: serie,
				data: dates.map(date => ({ x: date.toISOString(), y: Math.random() * 100 })),
			}));
		},
		serialSeries() {
			return this.series.map(({ data }) => data.reduce((acc, { y }) => acc + y, 0));
		},
	},
};
</script>
