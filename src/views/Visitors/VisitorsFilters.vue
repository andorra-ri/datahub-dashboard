<template >
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
        clearable
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
import Dropdown from '/@/components/Dropdown.vue';
import Calendar from '/@/components/Calendar.vue';
import config from '/@/config.yaml';

export default {
  name: 'VisitorsFilters',
  components: { Dropdown, Calendar },
  props: {
    modelValue: { type: Object, required: true },
  },
  setup() {
    const { t, locale } = useI18n();
    const period = ref([new Date(), new Date()]);
    const countries = ref([]);

    const COUNTRIES = config.countries.map(code => ({ code, name: t(`countries.${code}`) }));

    const apply = () => {
      const [since, until] = [...period.value].sort((a, b) => a - b);

    };

    return { t, locale, COUNTRIES, period, countries, apply };
  },
};
</script>
