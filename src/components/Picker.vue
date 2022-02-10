<template>
  <fieldset class="picker">
    <label v-for="option in options" :key="option">
      <input v-model="selected" type="radio" :value="option">
      <span>{{ t(`${namespace}${option}`) }}</span>
    </label>
  </fieldset>
</template>

<script>
import { computed } from 'vue';
import { useI18n } from 'vue-i18n';

export default {
  name: 'Picker',
  props: {
    options: { type: Array, required: true },
    modelValue: { type: [Number, String], default: undefined },
    namespace: { type: String, default: '' },
  },
  emits: ['update:modelValue'],
  setup(props, { emit }) {
    const { t } = useI18n();
    const selected = computed({
      get: () => props.modelValue,
      set: value => emit('update:modelValue', value),
    });
    return { t, selected };
  },
};
</script>
