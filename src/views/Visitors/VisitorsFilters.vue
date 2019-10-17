<template lang="html">
	<aside class="sidebar card">
		<header class="header">
			<h2><i class="icon mdi mdi-filter" /> Filtres</h2>
			<h3>Periode</h3>
			<calendar v-model="datesRange" :not-after="new Date()" range />
			<h3>Origen</h3>
			<dropdown
				:options="countries.options"
				v-model="countries.selected"
				multiple
				searchable
				clearable
				placeholder="Filtrar per origen"
				class="fluid" />
		<p class="content--right">
			<button @click="updateFilters">Filtrar</button>
		</p>
		</header>
	</aside>
</template>

<script>
import Dropdown from '@/components/Dropdown.vue';
import Calendar from '@/components/Calendar.vue';
import countries from '@/locales/ca/countries';

const { unknown, ad, eu, ...cleanCountries } = countries;

export default {
	name: 'visitors-filter',
	components: { Dropdown, Calendar },
	data() {
		return {
			datesRange: [new Date(), new Date()],
			countries: {
				selected: [],
				options: Object.keys(cleanCountries).map(code => ({
					value: code,
					label: this.$t(`countries.${code}`),
					icon: `flag flag-${code}`,
				})),
			},
		};
	},
	methods: {
		updateFilters() {
			const filters = {
				datesRange: this.datesRange,
				countries: this.countries.selected.map(({ value }) => value),
			};
			this.$emit('update', filters);
		},
	},
	mounted() { this.updateFilters(); },
};
</script>
