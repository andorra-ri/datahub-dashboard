<template>
  <section :class="['card', 'card--round', { 'loading': loading }]">
    <h2><i class="icon mdi mdi-clock-outline" /> {{ t('visitors.historic.title') }}</h2>
    <apex-chart
      type="bar"
      :options="options"
      :series="columns"
      height="300" />
  </section>
</template>

<script>
import { computed } from 'vue';
import { useI18n } from 'vue-i18n';
import ApexChart from 'vue3-apexcharts';
import { isWaitingFor } from '/@/services/wait';
import { historic } from '/@/repositories/visitors';
import apex from '/@/utils/charts';
import mergeDeep from '/@/utils/merge-deep';

export default {
  name: 'VisitorsHistoric',
  components: { ApexChart },
  setup() {
    const { t } = useI18n();
    const loading = isWaitingFor('load-visitors-historic');

    const options = mergeDeep(apex.column, {
      chart: { stacked: true },
      tooltip: { intersect: true, shared: false },
      plotOptions: { bar: { columnWidth: '20%' } },
      xaxis: { type: 'datetime' },
    });

    const columns = computed(() => {
      const dates = Object.values(historic.value?.dates || {});
      const series = dates.reduce((acc, { date, groups }) => {
        groups.forEach(({ group, sum }) => {
          const name = t(`visitors.${group}`);
          acc[group] = acc[group] || { name, data: [] };
          acc[group].data.push({ x: date, y: sum });
        });
        return acc;
      }, {});
      return Object.values(series);
    });

    return { t, loading, historic, columns, options };
  },
};
</script>
