<template >
	<section :class="['card', 'card--round', { 'loading': loading }]">
		<h2><i class="icon mdi mdi-chart-box-outline" /> {{ t('visitors.stats.title') }}</h2>
		<dropdown
			v-model="selected"
			:options="visitors"
      attribute="name"
			:placeholder="t('visitors.stats.selectCountry')"
      :no-options-text="t('visitors.stats.noOptions')"
			searchable>
      <template #pre>
				<i v-if="selected" :class="`flag flag-${selected.code} margin-r-1`" />
			</template>
      <template #option="{ option }">
				<i :class="`flag flag-${option.code} margin-r-1`" />
				{{ option.name }}
			</template>
    </dropdown>
    <div v-if="selected" class="stats">
      <article>
        <h3>{{ t('visitors.trippers') }}</h3>
        <stats-list :stats="stats.trippers" namespace="visitors.stats" />
      </article>
      <article>
        <h3>{{ t('visitors.tourists') }}</h3>
        <stats-list :stats="stats.tourists" namespace="visitors.stats" />
      </article>
      <article>
        <h3>{{ t('visitors.spending') }}</h3>
        <stats-list :stats="stats.spending" namespace="visitors.stats" />
        <apex-chart
          v-if="stats.spending.total.value"
          type="treemap"
          :series="spendingTreeSeries"
          :options="spendingTreeOptions" />
      </article>
		</div>
	</section>
</template>

<script>
import { ref, computed } from 'vue';
import { useI18n } from 'vue-i18n';
import { visitors } from '/@/repositories/visitors';
import StatsList from '/@/components/StatsList.vue';
import Dropdown from '/@/components/Dropdown.vue';
import ApexChart from 'vue3-apexcharts';

export default {
  name: 'VisitorsStats',
  components: { StatsList, Dropdown, ApexChart },
  setup() {
    const { t } = useI18n();
    const loading = ref(false);

    const selected = ref(undefined);

    const stats = computed(() => {
			const { visitors, visits, overnights, spending } = selected.value;
			return {
				trippers: {
					visitors: { value: visitors.trippers, unit: 'people' },
					visits: { value: visits.trippers, unit: 'visits' },
					loyalty: { value: visits.trippers / visitors.trippers || 0, precision: 2, unit: 'visitsPerson' },
				},
				tourists: {
					visitors: { value: visitors.tourists, unit: 'people' },
					visits: { value: visits.tourists, unit: 'visits' },
					loyalty: { value: visits.tourists / visitors.tourists || 0, precision: 2,  unit: 'visitsPerson' },
					overnights: { value: overnights, unit: 'nights' },
					overnightsMean: { value: overnights / visits.tourists, precision: 2, unit: 'nightsVisit' },
				},
				spending: {
					total: { value: spending.mean * visitors.uniques, precision: 2, unit: 'euro' },
					mean: { value: spending.mean, precision: 2, unit: 'euro' },
				},
			};
		});

    const spendingTreeSeries = computed(() => {
      const total = selected.value.spending.mean * selected.value.visitors.uniques;
      const data = Object.entries(selected.value.spending.merchant)
        .map(([name, value]) => ({ x:  t(`visitors.stats.merchant.${name}`), y: value * total / 100 }));
      return [{ data }];
    });

    const spendingTreeOptions = {
      chart: {
        toolbar: { show: false },
      },
      yaxis: {
        labels: {
          formatter: value => `${parseFloat(value.toFixed(2)).toLocaleString()} €`,
        },
      },
    };

    return { t, visitors, selected, stats, loading, spendingTreeSeries, spendingTreeOptions };
  },
};
</script>

<style lang="scss" scoped>
.dropdown .input .flag { margin-left: 10px; }
</style>
