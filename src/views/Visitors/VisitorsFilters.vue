<template>
  <aside class="sidebar card">
    <header class="header">
      <h2><i class="icon mdi mdi-filter" /> {{ t('filters.title') }}</h2>
      <h3>{{ t('filters.period') }}</h3>
      <calendar v-model="period" :locale="locale" :not-after="new Date()" />
      <h3>{{ t('filters.origin') }}</h3>
      <dropdown
        v-model="countries"
        :options="COUNTRIES"
        attribute="name"
        searchable
        :placeholder="t('visitors.stats.selectCountry')"
        :no-options-text="t('visitors.stats.noOptions')">
        <template #tags="{ tag }">{{ tag.name }}</template>
        <template #option="{ option }">
          <i :class="`flag flag-${option.code} margin-r-1`" />
          {{ option.name }}
        </template>
      </dropdown>
      <p>
        <button @click="apply">{{ t('filters.filter') }}</button>
      </p>
    </header>
  </aside>
</template>

<script>
import { ref } from 'vue';
import { useI18n } from 'vue-i18n';
import { filters } from '/@/repositories/visitors';
import Dropdown from '/@/components/Dropdown.vue';
import Calendar from '/@/components/Calendar.vue';
import config from '/@/config.yaml';

export default {
  name: 'VisitorsFilters',
  components: { Dropdown, Calendar },
  setup() {
    const { t, locale } = useI18n();
    const period = ref([...filters.period]);
    const countries = ref([...filters.countries]);

    const COUNTRIES = config.countries.map(code => ({ code, name: t(`countries.${code}`) }));

    const apply = () => {
      filters.period = period.value;
      filters.countries = countries.value.map(country => country.code);
    };

    return { t, locale, COUNTRIES, period, countries, apply };
  },
};
</script>
