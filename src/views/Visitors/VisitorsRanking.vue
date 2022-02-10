<template>
  <section :class="['card', 'card--round', { 'loading': loading }]">
    <h2><i class="icon mdi mdi-trophy" /> {{ t('visitors.ranking.title') }}</h2>
    <picker v-model="ranker" :options="rankers" class="content--right" />
    <ranking
      :list="countries"
      :ranker="ranker"
      :pagination="10"
      show-values
      :unit-suffix="t('units.people')">
      <template #default="{ item }">
        <i :class="`flag flag-${item.code} margin-r-1`" />
        {{ item.name }}
      </template>
    </ranking>
  </section>
</template>

<script>
import { ref } from 'vue';
import { useI18n } from 'vue-i18n';
import { isWaitingFor } from '/@/services/wait';
import { countries } from '/@/repositories/visitors';
import Ranking from '/@/components/Ranking.vue';
import Picker from '/@/components/Picker.vue';

const rankers = ['visitors.uniques', 'visitors.trippers', 'visitors.tourists'];

export default {
  name: 'VisitorsRanking',
  components: { Ranking, Picker },
  setup() {
    const { t } = useI18n();
    const ranker = ref('visitors.uniques');
    const loading = isWaitingFor('load-visitors');

    return { t, loading, countries, rankers, ranker };
  },
};
</script>

<style lang="scss" scoped>
.picker { margin: 20px 0 10px; }
</style>
