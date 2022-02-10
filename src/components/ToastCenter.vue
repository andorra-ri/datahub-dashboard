<template>
  <ul class="toast-center">
    <li
      v-for="({ type, clickable, click, msg }, id) in toasts"
      :key="id"
      :class="['toast', `toast--${type}`, { clickable }]"
      @click="click">
      {{ msg }}
    </li>
  </ul>
</template>

<script>
import toasts from '/@/services/toasts';

export default {
  name: 'ToastCenter',
  setup() {
    return { toasts };
  },
};
</script>

<style lang="scss">
.toast-center {
  list-style: none;
  position: fixed;
  z-index: 10;

  .toast {
    background: #8882;
    color: #fff;

    &.clickable { cursor: pointer; }

    &--error { background: #cf615e; }
    &--success { background: #51927c; }
    &--info { background: #4d819b; }
    &--warning { background: #daa74f; }
  }
}
</style>
