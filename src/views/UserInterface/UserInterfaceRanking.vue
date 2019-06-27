<template lang="html">
	<section class="card card--round">
		<h2>{{ $t('ui.ranking.title') }}</h2>
		<fieldset class="picker content--right">
			<label>
				<input type="radio" v-model="ranker" value="population" />
				<span>{{ $t('ui.ranking.selector.population') }}</span>
			</label>
			<label>
				<input type="radio" v-model="ranker" value="gdp.nominal" />
				<span>{{ $t('ui.ranking.selector.gdp_nominal') }}</span>
			</label>
			<label>
				<input type="radio" v-model="ranker" value="gdp.pc" />
				<span>{{ $t('ui.ranking.selector.gdp_per_capita') }}</span>
			</label>
		</fieldset>
		<ranking
			:list="countries"
			:ranker="ranker"
			:unit-prefix="unit.pre"
			:unit-suffix="unit.suf"
			:pagination="6"
			show-values>
			<template v-slot="{ item }">
				<i :class="`flag flag-${item.code} margin-r-1`" />
				{{ $t(`countries.${item.code}`) }}
			</template>
		</ranking>
	</section>
</template>

<script>
import Ranking from '@/components/Ranking.vue';

export default {
	name: 'user-interface-ranking',
	components: { Ranking },
	data() {
		return {
			ranker: 'population',
			countries: [
				{ code: 'us', population: 329, gdp: { nominal: 19.48, pc: 59.9 } },
				{ code: 'cn', population: 1420, gdp: { nominal: 12.23, pc: 8.82 } },
				{ code: 'jp', population: 126, gdp: { nominal: 4.87, pc: 38.4 } },
				{ code: 'de', population: 82, gdp: { nominal: 3.69, pc: 44.6 } },
				{ code: 'in', population: 1368, gdp: { nominal: 2.65, pc: 1.9 } },
				{ code: 'gb', population: 66, gdp: { nominal: 2.63, pc: 39.9 } },
				{ code: 'fr', population: 65, gdp: { nominal: 2.58, pc: 38.4 } },
				{ code: 'br', population: 212, gdp: { nominal: 2.05, pc: 9.8 } },
				{ code: 'it', population: 59, gdp: { nominal: 1.94, pc: 32.1 } },
				{ code: 'ca', population: 37, gdp: { nominal: 1.64, pc: 44.8 } },
				{ code: 'ru', population: 143, gdp: { nominal: 1.57, pc: 10.7 } },
				{ code: 'kr', population: 51, gdp: { nominal: 1.50, pc: 29.7 } },
			],
		};
	},
	computed: {
		unit() {
			switch (this.ranker) {
				case 'gdp.nominal': return { pre: '$ ', suf: 'T' };
				case 'gdp.pc': return { pre: '$ ', suf: 'k' };
				case 'population': return { pre: '', suf: 'M' };
				default: return { pre: '', suf: '' };
			}
		},
	},
};
</script>
