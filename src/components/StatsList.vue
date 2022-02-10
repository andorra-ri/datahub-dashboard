<template>
  <ul class="stats-list">
    <li v-for="(stat, name) in stats" :key="name">
      <span class="name">{{ t(`${namespace}.${name}`) }}</span>
      <span class="value">
        {{ parseFloat(stat.value.toFixed(stat.precision || 0)).toLocaleString() }}
      </span>
      <span class="unit">{{ t(`units.${stat.unit}`) }}</span>
    </li>
  </ul>
</template>

<script>
import { useI18n } from 'vue-i18n';

export default {
  name: 'StatsList',
  props: {
    namespace: { type: String, required: true },
    stats: { type: Object, required: true },
  },
  setup() {
    const { t } = useI18n();
    return { t };
  },
};
</script>
