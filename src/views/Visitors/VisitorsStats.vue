<template lang="html">
	<section :class="['card', 'card--round', { 'loading': loading }]">
		<h2><i class="icon mdi mdi-" /> {{ $t('visitors.country_stats.title') }}</h2>
		<div v-if="selected" class="stats">
			<header>
				<i :class="`flag flag--big flag-${selected.code}`" />
				<h1>{{ selected.label }}</h1>
			</header>
			<article v-for="(group, groupName) in stats" :key="groupName">
				<h3>{{ $t(`visitors.group.${groupName}`) }}</h3>
				<div class="row">
					<div v-for="(stat, name) in group" :key="name" class="column stats__stat">
						<h4>{{ $t(`visitors.country_stats.stat.${name}`) }}</h4>
						<strong>{{ (stat.value | round) || 'N/A' }}</strong>
						<em>{{ $t(`visitors.unit.${stat.unit}`) }}</em>
					</div>
				</div>
			</article>
			<article>
				<apex-chart
					type="bar"
					:options="spendingOptions"
					:series="spendingSeries"
					height="150" />
			</article>
		</div>
		<dropdown
			v-model="selected"
			:options="countries"
			:placeholder="$t('visitors.country_stats.select')"
			:dir="selected ? 'up' : 'down'"
			searchable />
	</section>
</template>

<script>
import datahub from '@/api/datahub';
import ApexChart from 'vue-apexcharts';
import { apexOptions } from '@/utils/charts/apexOptions';
import Dropdown from '@/components/Dropdown.vue';

export default {
	name: 'visitors-stats',
	components: { ApexChart, Dropdown },
	filters: {
		round(number) {
			return Math.round(number * 100) / 100;
		},
	},
	props: { dates: { type: Object, required: true } },
	data() {
		return {
			loading: false,
			countries: [],
			selected: undefined,
			spendingOptions: apexOptions.singleColumn,
		};
	},
	computed: {
		stats() {
			const { visitors, visits, overnights, spending } = this.selected;
			return {
				trippers: {
					total: { value: visitors.trippers, unit: 'people' },
					visits: { value: visits.trippers, unit: 'visits' },
					loyalty: { value: visits.trippers / visitors.trippers || 0, unit: 'visits_per_person' },
				},
				tourists: {
					total: { value: visitors.tourists, unit: 'people' },
					visits: { value: visits.tourists, unit: 'visits' },
					loyalty: { value: visits.tourists / visitors.tourists, unit: 'visits_per_person' },
					overnights: { value: overnights, unit: 'nights' },
					overnights_mean: { value: overnights / visits.tourists, unit: 'nights_per_person' },
				},
				spending: {
					total: { value: spending.mean * visitors.uniques, unit: 'euro' },
					card_mean: { value: spending.mean, unit: 'euro' },
				},
			};
		},
		spendingSeries() {
			const { spending } = this.selected;
			return Object.entries(spending.merchant)
				.map(([name, value]) => ({
					name: this.$t(`spending.merchant.${name}`),
					data: [value],
				}))
				.sort((a, b) => b.data[0] - a.data[0]);
		},
	},
	watch: {
		dates: {
			immediate: true,
			handler({ since, until }) { this.fetchStats(since, until); },
		},
	},
	methods: {
		fetchStats(since, until) {
			if (!since || !until) return;
			const filter = `since=${since.toISOString()}&until=${until.toISOString()}`;
			const endpoint = `/visitors/summary?${filter}`;
			this.loading = true;
			datahub.get(endpoint).then(({ data }) => {
				this.countries = data.map(country => ({
					icon: `flag flag-${country.code}`,
					value: country.code,
					label: this.$t(`countries.${country.code}`),
					...country,
				}));
				if (this.selected) {
					this.selected = this.countries.find(({ code }) => code === this.selected.code);
				}
				this.loading = false;
			});
		},
	},
};
</script>

<style lang="scss" scoped>
.stats {
	margin: 40px 10px 30px;
	line-height: 1em;

	header {
		margin-bottom: 30px;
		text-align: center;
	}

	&__stat {

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
}
</style>
