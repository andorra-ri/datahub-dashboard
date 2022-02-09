<template>
  <div class="screen">
    <main class="content">
      <header class="header">
        <h1><em>{{ t('visitors.section') }}</em>{{ t('visitors.title') }}</h1>
        <!--
        <p>{{ dateFormat(dates.since, 'FULL_SHORT', locale) }} - {{ dateFormat(dates.until, 'FULL_SHORT', locale) }}</p>
        -->
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
import { reactive, watch } from 'vue';
import { useI18n } from 'vue-i18n';
import { loadVisitors, loadHistoric } from '/@/repositories/visitors';
import { dateFormat } from '/@/utils/date';
import VisitorsSummary from './VisitorsSummary.vue';
import VisitorsHistoric from './VisitorsHistoric.vue';
import VisitorsRanking from './VisitorsRanking.vue';
import VisitorsStats from './VisitorsStats.vue';
import VisitorsFilters from './VisitorsFilters.vue';

export default {
  name: 'visitors',
  components: {
    VisitorsSummary,
    VisitorsHistoric,
    VisitorsRanking,
    VisitorsStats,
    VisitorsFilters,
  },
  setup() {
    const { t, locale } = useI18n();

    return { t, locale, dateFormat };
  },
};
</script>
