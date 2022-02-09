<template>
  <ul class="pagination">
    <li v-for="i in pages" :key="i">
      <span
        :class="{ 'selected': i === modelValue + 1 }"
        @click="selectPage(i)" />
    </li>
  </ul>
</template>

<script>
import { watch } from 'vue';

export default {
  name: 'Pagination',
  props: {
    pages: { type: Number, required: true },
    modelValue: { type: Number, required: true },
  },
  emits: ['update:modelValue'],
  setup(props, { emit }) {
    const selectPage = page => emit('update:modelValue', page - 1);

    watch(() => props.pages, count => {
      if (props.modelValue > count) selectPage(count - 1);
    }, { immediate: true });

    return { selectPage };
  },
};
</script>

<style lang="scss" scoped>
.pagination {
  margin-top: 10px;
  text-align: center;

  li {
    display: inline-block;
    margin: 0 5px;
    vertical-align: middle;

    span {
      display: block;
      height: 7px;
      width: 7px;
      border-radius: 50%;
      background: rgba(#461ea3, 0.5);
      cursor: pointer;
      transition: all 0.2s ease-in-out;

      &.selected {
        background: #461ea3;
        transform: scale(1.5);
      }
    }
  }
}
</style>
