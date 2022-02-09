import { ref, computed, reactive, watch } from 'vue';
import api from '/@/services/datahub';
import i18n from '/@/i18n';

const VISITORS = ref([]);
const HISTORIC = ref({});
export const filters = reactive({
  period: [new Date(), new Date()],
  countries: [],
});

export const visitors = computed(() => (filters.countries?.length
  ? VISITORS.value.filter(({ code }) => filters.countries.includes(code))
  : VISITORS.value
));

export const historic = computed(() => {
  const dates = HISTORIC.value.dates?.map(date => ({
    ...date,
    groups: date.groups.map(group => ({
      ...group,
      sum: Object.entries(group.countries).reduce((acc, [code, count]) => (
        !filters.countries.length || filters.countries.includes(code) ? acc + count : acc
      ), 0),
    })),
  }));
  return { ...HISTORIC.value, dates };
});

export const loadVisitors = async ({ since, until }) => {
  const dates = `since=${since.toISOString()}&until=${until.toISOString()}`;
  const { data } = await api.get(`/visitors/summary/?${dates}`);
  VISITORS.value = data.map(country => {
    const name = i18n.global.t(`countries.${country.code}`);
    return { name, ...country };
  });
};

export const loadHistoric = async ({ since, until }) => {
  const dates = `since=${since.toISOString()}&until=${until.toISOString()}`;
  const { data } = await api.get(`/visitors/historic/?${dates}`);
  HISTORIC.value = data;
};

watch(() => filters.period, async period => {
  const [since, until] = [...period].sort((a, b) => a - b);
  await loadVisitors({ since, until });
  await loadHistoric({ since, until });
}, { immediate: true });
