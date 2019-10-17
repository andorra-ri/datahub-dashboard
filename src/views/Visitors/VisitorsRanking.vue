<template lang="html">
	<section :class="['card', 'card--round', { 'loading': loading }]">
		<h2><i class="icon mdi mdi-trophy" /> {{ $t('visitors.countries_ranking.title') }}</h2>
		<fieldset class="picker content--right">
			<label>
				<input type="radio" v-model="ranker" value="visitors.total" />
				<span>Total</span>
			</label>
			<label>
				<input type="radio" v-model="ranker" value="visitors.trippers" />
				<span>{{ $t('visitors.group.trippers') }}</span>
			</label>
			<label>
				<input type="radio" v-model="ranker" value="visitors.tourists" />
				<span>{{ $t('visitors.group.tourists') }}</span>
			</label>
		</fieldset>
		<ranking
			:list="filteredCountries"
			:ranker="ranker"
			:pagination="10"
			show-values>
			<template v-slot="{ item }">
				<i :class="`flag flag-${item.code} margin-r-1`" />
				{{ $t(`countries.${item.code}`) }}
			</template>
		</ranking>
	</section>
</template>

<script>
import datahub from '@/api/datahub';
import Ranking from '@/components/Ranking.vue';

const sumObject = object => Object.values(object).reduce((sum, value) => sum + value, 0);

export default {
	name: 'visitors-ranking',
	components: { Ranking },
	props: { filters: { type: Object, default: () => {} } },
	data() {
		return {
			loading: false,
			countries: [],
			ranker: 'visitors.total',
		};
	},
	computed: {
		filteredCountries() {
			const { countries: allowCountries } = this.filters;
			return this.countries
				.filter(({ code }) => !allowCountries.length || allowCountries.includes(code))
				.map((country) => {
					const visitors = { ...country.visitors, total: sumObject(country.visitors) };
					const visits = { ...country.visits, total: sumObject(country.visits) };
					return { ...country, visitors, visits };
				});
		},
	},
	mounted() {
		this.loading = true;
		datahub.get('/visitors/countries').then(({ data: { countries } }) => {
			this.countries = countries;
			this.loading = false;
		});
	},
};
</script>
