<template>
  <section :class="['card', 'card--round', { 'loading': loading }]">
    <div class="row">
      <div v-for="(subgroups, group) in summary" :key="group" class="column summary__item">
        <h2>{{ t(`visitors.${group}`) }}</h2>
        <div class="row">
          <div v-for="(value, subgroup) in subgroups" :key="subgroup" class="column summary__item">
            <h3>{{ t(`visitors.${subgroup}`) }}</h3>
            <strong>{{ numberFormat(value) }}</strong>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import { computed } from 'vue';
import { useI18n } from 'vue-i18n';
import { isWaitingFor } from '/@/services/wait';
import millify from 'millify';
import { countries } from '/@/repositories/visitors';

export default {
  name: 'VisitorsSummary',
  setup() {
    const { t, locale } = useI18n();
    const loading = isWaitingFor('load-visitors');

    const decimalSeparator = (1.1).toLocaleString(locale.value).substring(1, 2);
    const numberFormat = number => millify(number, { decimalSeparator });

    // Filter by countries
    const summary = computed(() => countries.value.reduce((acc, country) => {
      acc.visitors.unique += country.visitors.uniques;
      acc.visitors.tourists += country.visitors.tourists;
      acc.visitors.trippers += country.visitors.trippers;
      acc.visits.tourists += country.visits.tourists;
      acc.visits.trippers += country.visits.trippers;
      acc.visits.overnights += country.overnights;
      return acc;
    }, {
      visitors: { unique: 0, trippers: 0, tourists: 0 },
      visits: { trippers: 0, tourists: 0, overnights: 0 },
    }));

    return { t, loading, summary, numberFormat };
  },
};
</script>

<style lang="scss" scoped>
.summary__item {
  h2 {
    margin: 0;
  }

  h3 {
    margin: 0;
    font-weight: normal;
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
