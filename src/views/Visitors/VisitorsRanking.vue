<template>
  <section :class="['card', 'card--round', { 'loading': loading }]">
    <h2><i class="icon mdi mdi-trophy" /> {{ t('visitors.ranking.title') }}</h2>
    <fieldset class="picker content--right">
      <label>
        <input v-model="ranker" type="radio" value="visitors.uniques">
        <span>{{ t('visitors.unique') }}</span>
      </label>
      <label>
        <input v-model="ranker" type="radio" value="visitors.trippers">
        <span>{{ t('visitors.trippers') }}</span>
      </label>
      <label>
        <input v-model="ranker" type="radio" value="visitors.tourists">
        <span>{{ t('visitors.tourists') }}</span>
      </label>
    </fieldset>
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
import { countries } from '/@/repositories/visitors';
import Ranking from '/@/components/Ranking.vue';

export default {
  name: 'VisitorsRanking',
  components: { Ranking },
  setup() {
    const loading = ref(false);
    const { t } = useI18n();
    const ranker = ref('visitors.uniques');

    return { t, loading, countries, ranker };
  },
};
</script>

<style lang="scss" scoped>
.picker { margin: 20px 0 10px; }
</style>
