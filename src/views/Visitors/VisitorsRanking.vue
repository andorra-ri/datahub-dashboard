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
			:list="countries"
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

const sumObjectParams = object => Object.values(object).reduce((sum, value) => sum + value, 0);

export default {
	name: 'visitors-ranking',
	components: { Ranking },
	data() {
		return {
			loading: false,
			countries: [],
			ranker: 'visitors.total',
		};
	},
	methods: {
		loadCountries() {
			this.loading = true;
			datahub.get('/visitors/countries').then(({ data: { countries } }) => {
				this.countries = countries.map((country) => {
					/* eslint-disable no-param-reassign */
					country.visitors.total = sumObjectParams(country.visitors);
					country.visits.total = sumObjectParams(country.visits);
					/* eslint-enable no-param-reassign */
					return country;
				});
				this.loading = false;
			});
		},
	},
	mounted() { this.loadCountries(); },
};
</script>
