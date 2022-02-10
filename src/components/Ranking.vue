<template>
  <div class="ranking">
    <ul class="ranking-list">
      <li v-for="item in rank" :key="item._rank">
        <span class="rank">{{ item._rank }}</span>
        <span class="name"><slot :item="item" /></span>
        <template v-if="showValues">
          <span class="prefix">{{ unitPrefix }}</span>
          <span class="value">{{ parseFloat(item._value.toFixed(0)).toLocaleString() }}</span>
          <span class="suffix">{{ unitSuffix }}</span>
        </template>
      </li>
    </ul>
    <pagination v-if="pagination" v-model="page" :pages="pages" />
  </div>
</template>

<script>
import { ref, computed } from 'vue';
import Pagination from './Pagination.vue';

const objpath = (obj, path) => path.split('.').reduce((acc, prop) => acc[prop], obj);

export default {
  name: 'Ranking',
  components: { Pagination },
  props: {
    list: { type: Array, required: true },
    ranker: { type: String, required: true },
    pagination: { type: Number, default: 10 },
    showValues: { type: Boolean, default: false },
    selectable: { type: Boolean, default: false },
    unitPrefix: { type: String, default: '' },
    unitSuffix: { type: String, default: '' },
  },
  setup(props) {
    const page = ref(0);
    const pages = computed(() => Math.ceil(props.list.length / props.pagination));

    const rank = computed(() => {
      const offset = page.value * props.pagination;
      return [...props.list]
        .sort((a, b) => {
          const aAttr = objpath(a, props.ranker);
          const bAttr = objpath(b, props.ranker);
          const isNumber = typeof aAttr === 'number' || typeof bAttr === 'number';
          return isNumber ? bAttr - aAttr : aAttr.localeCompare(bAttr);
        })
        .map((item, i) => {
          const _value = objpath(item, props.ranker); // eslint-disable-line no-underscore-dangle
          return { ...item, _value, _rank: i + 1 };
        })
        .slice(offset, props.pagination ? offset + props.pagination : props.list.length);
    });

    return { rank, pages, page };
  },
};
</script>
