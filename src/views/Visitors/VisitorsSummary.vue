<template>
  <section :class="['card', 'card--round', { 'loading': loading }]">
    <div class="row">
      <div v-for="(value, name) in summary" :key="name" class="column summary__item">
        <h4>{{ t(`visitors.${name}`) }}</h4>
        <strong>{{ numberFormat(value) }}</strong>
      </div>
    </div>
  </section>
</template>

<script>
import { ref, computed } from 'vue';
import { useI18n } from 'vue-i18n';
import millify from 'millify';
import { countries } from '/@/repositories/visitors';

export default {
  name: 'VisitorsSummary',
  setup() {
    const { t } = useI18n();
    const numberFormat = number => millify(number);
    const loading = ref(false);

    // Filter by countries
    const summary = computed(() => countries.value.reduce((acc, country) => {
      acc.uniqueVisitors = (acc.uniqueVisitors || 0) + country.visitors.uniques;
      acc.tourists = (acc.tourists || 0) + country.visitors.tourists;
      acc.touristVisits = (acc.touristVisits || 0) + country.visits.tourists;
      acc.trippers = (acc.trippers || 0) + country.visitors.trippers;
      acc.tripperVisits = (acc.tripperVisits || 0) + country.visits.trippers;
      acc.spending = (acc.spending || 0) + country.spending.mean * country.visitors.uniques;
      return acc;
    }, {}));

    return { t, loading, summary, numberFormat };
  },
};
</script>

<style lang="scss" scoped>
.summary__item {
  h4 {
    text-transform: uppercase;
    font-size: 0.8em;
    line-height: 1.5em;
    color: #999;
  }

  strong {
    font-size: 1.8em;
    line-height: 1em;
  }

  em {
    font-size: 0.8em;
    margin-left: 3px;
    display: block;
    white-space: nowrap;
  }
}
</style>
