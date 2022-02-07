import { ref, computed } from 'vue';
import api from '/@/services/datahub';
import i18n from '/@/i18n';

const VISITORS = ref([]);
const HISTORIC = ref({});

export const visitors = computed(() => {
  return VISITORS.value;
});

export const historic = computed(() => {
  return HISTORIC.value;
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
