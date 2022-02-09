<template>
  <section :class="['card', 'card--round', { 'loading': loading }]">
    <h2><i class="icon mdi mdi-chart-box-outline" /> {{ t('visitors.stats.title') }}</h2>
    <dropdown
      v-model="country"
      :options="countries"
      attribute="name"
      :placeholder="t('visitors.stats.selectCountry')"
      :no-options-text="t('visitors.stats.noOptions')"
      searchable>
      <template #pre>
        <i v-if="country" :class="`flag flag-${country.code} margin-r-1`" />
      </template>
      <template #option="{ option }">
        <i :class="`flag flag-${option.code} margin-r-1`" />
        {{ option.name }}
      </template>
    </dropdown>
    <vue-collapsible-panel-group v-if="country" accordion>
      <vue-collapsible-panel>
        <template #title>{{ t('visitors.profile') }}</template>
        <template #content>
          <article>
            <h3>{{ t('visitors.trippers') }}</h3>
            <stats-list :stats="stats.trippers" namespace="visitors.stats" />
          </article>
          <article>
            <h3>{{ t('visitors.tourists') }}</h3>
            <stats-list :stats="stats.tourists" namespace="visitors.stats" />
          </article>
        </template>
      </vue-collapsible-panel>
      <vue-collapsible-panel :expanded="false">
        <template #title>{{ t('visitors.spending') }}</template>
        <template #content>
          <article>
            <p class="note">{{ t('visitors.spending_disclaimer') }}</p>
            <apex-chart
              type="treemap"
              :series="spendingTreeSeries"
              :options="spendingTreeOptions" />
          </article>
        </template>
      </vue-collapsible-panel>
    </vue-collapsible-panel-group>
  </section>
</template>

<script>
import { ref, computed, watch } from 'vue';
import { useI18n } from 'vue-i18n';
import ApexChart from 'vue3-apexcharts';
import { VueCollapsiblePanelGroup, VueCollapsiblePanel } from '@dafcoe/vue-collapsible-panel';
import { isWaitingFor } from '/@/services/wait';
import { countries } from '/@/repositories/visitors';
import StatsList from '/@/components/StatsList.vue';
import Dropdown from '/@/components/Dropdown.vue';

export default {
  name: 'VisitorsStats',
  components: { StatsList, Dropdown, ApexChart, VueCollapsiblePanelGroup, VueCollapsiblePanel },
  setup() {
    const { t } = useI18n();
    const country = ref(undefined);
    const loading = isWaitingFor('load-visitors');

    const stats = computed(() => {
      const { visitors, visits, overnights } = country.value;
      return {
        trippers: {
          visitors: { value: visitors.trippers, unit: 'people' },
          visits: { value: visits.trippers, unit: 'visits' },
          loyalty: { value: visits.trippers / visitors.trippers || 0, precision: 2, unit: 'visitsPerson' },
        },
        tourists: {
          visitors: { value: visitors.tourists, unit: 'people' },
          visits: { value: visits.tourists, unit: 'visits' },
          loyalty: { value: visits.tourists / visitors.tourists || 0, precision: 2, unit: 'visitsPerson' },
          overnights: { value: overnights, unit: 'nights' },
          overnightsMean: { value: overnights / visits.tourists, precision: 2, unit: 'nightsVisit' },
        },
      };
    });

    const spendingTreeSeries = computed(() => {
      const data = Object.entries(country.value.spending.merchant)
        .map(([name, value]) => ({
          x: t(`visitors.stats.merchant.${name}`),
          y: value,
        }));
      return [{ data }];
    });

    const spendingTreeOptions = {
      chart: { toolbar: { show: false } },
      yaxis: { labels: { formatter: val => `${parseFloat(val.toFixed(2)).toLocaleString()}%` } },
    };

    watch(countries, () => {
      country.value = countries.value.find(({ code }) => code === country.value?.code);
    });

    return { t, countries, country, stats, loading, spendingTreeSeries, spendingTreeOptions };
  },
};
</script>

<style lang="scss" scoped>
.dropdown .input .flag { margin-left: 10px; }
</style>

<style lang="scss">
.vcpg {
  margin: 15px 0;
}
.vcp {

  &__header {
    display: flex;
    flex-direction: row-reverse;
    align-items: center;
    font-size: 1.2em;
    padding: 5px 0;
    font-weight: bold;
    cursor: pointer;

    &-title { margin-right: auto; }
  }

  &__header-icon {
    height: 16px;
    width: 16px;
    margin-right: 5px;
    transform: rotate(-90deg);

    svg {
      height: 100%;
      width: 100%;
    }
  }

  &--expanded &__header-icon {
    transform: rotate(0);
  }

  &__body {
    margin: 15px 10px;
  }

}
</style>
