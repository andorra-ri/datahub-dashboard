<template>
  <div class="screen">
    <main class="content">
      <header class="header">
        <h1><em>{{ t('visitors.section') }}</em>{{ t('visitors.title') }}</h1>
        <p>{{ range }}</p>
      </header>
      <div class="grid">
        <div class="row">
          <div class="column">
            <visitors-summary />
          </div>
        </div>
        <div class="row">
          <div class="column">
            <visitors-historic />
          </div>
        </div>
        <div class="row">
          <div class="column col-6">
            <visitors-ranking />
          </div>
          <div class="column col-6">
            <visitors-stats />
          </div>
        </div>
      </div>
    </main>
    <visitors-filters />
  </div>
</template>

<script>
import { computed } from 'vue';
import { useI18n } from 'vue-i18n';
import { filters } from '/@/repositories/visitors';
import { dateFormat } from '/@/utils/date';
import VisitorsSummary from './VisitorsSummary.vue';
import VisitorsHistoric from './VisitorsHistoric.vue';
import VisitorsRanking from './VisitorsRanking.vue';
import VisitorsStats from './VisitorsStats.vue';
import VisitorsFilters from './VisitorsFilters.vue';

export default {
  name: 'Visitors',
  components: {
    VisitorsSummary,
    VisitorsHistoric,
    VisitorsRanking,
    VisitorsStats,
    VisitorsFilters,
  },
  setup() {
    const { t, locale } = useI18n();

    const range = computed(() => {
      const period = filters.period.sort((a, b) => a - b);
      const since = dateFormat(period[0], 'FULL_SHORT', locale);
      const until = dateFormat(period[1], 'FULL_SHORT', locale);
      return `${since} - ${until}`;
    });

    return { t, locale, range };
  },
};
</script>
