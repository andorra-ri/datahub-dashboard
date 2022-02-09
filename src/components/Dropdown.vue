<template>
  <div class="dropdown">
    <label :class="['input', { 'active': !multiple && modelValue, 'disabled': disabled }]">
      <slot name="pre" />
      <ul v-if="multiple" class="dropdown__tags">
        <li v-for="tag in modelValue" :key="attr(tag)">
          <slot :tag="tag" name="tags">{{ attr(tag) }}</slot>
          <i @click="toggle(tag)">&times;</i>
        </li>
      </ul>
      <input
        v-model="search"
        type="text"
        :placeholder="attr(selected)"
        :readonly="!searchable">
    </label>
    <ul v-if="!disabled" :class="`dropdown__options dropdown__options--${dir}`">
      <li
        v-for="option in filteredOptions"
        :key="attr(option)"
        @click="toggle(option)">
        <slot :option="option" name="option">{{ attr(option) }}</slot>
      </li>
      <p v-if="!filteredOptions.length" class="no-options">{{ noOptionsText }}</p>
    </ul>
  </div>
</template>

<script>
import { ref, computed } from 'vue';

const normalize = string => {
  if (typeof string !== 'string') return '';
  return string.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase();
};

export default {
  name: 'Dropdown',
  props: {
    options: { type: Array, required: true },
    attribute: { type: String, default: 'label' },
    modelValue: { type: [Object, String, Number], default: undefined },
    placeholder: { type: String, default: 'Select...' },
    searchable: { type: Boolean, default: false },
    disabled: { type: Boolean, default: false },
    noOptionsText: { type: String, default: 'No results found' },
    dir: { type: String, default: 'down' },
  },
  emits: ['update:modelValue'],
  setup(props, { emit }) {
    const search = ref(undefined);

    const attr = item => item?.[props.attribute] || item;

    const multiple = computed(() => Array.isArray(props.modelValue));

    const selected = computed(() => (
      multiple.value || !props.modelValue
        ? { [props.attribute]: props.placeholder }
        : props.modelValue
    ));

    const filteredOptions = computed(() => {
      const needle = normalize(search.value);
      return props.options.filter(option => {
        const match = needle
          ? normalize(attr(option)).includes(needle)
          : true;
        return match;
      });
    });

    const toggle = option => {
      search.value = '';
      const value = multiple.value
        ? props.modelValue.find(item => attr(item) === attr(option))
          ? props.modelValue.filter(item => attr(item) !== attr(option))
          : [...new Set([...props.modelValue, option])]
        : option;
      emit('update:modelValue', value);
    };

    return { search, selected, filteredOptions, toggle, multiple, attr };
  },
};
</script>

<style lang="scss" scoped>
.dropdown {
  display: inline-block;
  position: relative;

  // Selected
  .input {
    display: flex;
    align-items: center;
    overflow: visible;
    flex-wrap: wrap;

    input { flex: 1 1 50px; }

    &.active input::placeholder {
      opacity: 1;
      color: inherit;
    }
  }

  &.fluid {
    display: block;
    .input { width: 100%; }
  }

  // Components
  &__options {
    box-sizing: border-box;
    background: #fff;
    border: 1px solid #a5acb6;
    border-radius: 3px;
    display: none;
    left: 0;
    margin: 2px;
    max-height: 193px;
    min-width: 100%;
    overflow: auto;
    padding: 5px;
    position: absolute;
    top: 100%;
    z-index: 1;

    &--up {
      top: auto;
      bottom: 100%;
    }

    // Components
    li {
      align-items: center;
      border-radius: 3px;
      color: inherit;
      cursor: pointer;
      display: flex;
      line-height: inherit;
      padding: 5px 12px;
      white-space: nowrap;

      // Components
      .icon { margin-left: 0; }

      // State
      &:hover {
        background: #461ea3;
        color: #fff;
      }
    }

    .no-options { padding: 0 12px; }

    // State
    &:hover,
    :focus-within > & { display: block; }
  }

  &__tags {
    display: flex;
    flex-wrap: wrap;

    li {
      flex: 0;
      background: lighten(#461ea3, 50);
      color: #461ea3;
      display: inline-block;
      padding: 5px 7px;
      font-size: 0.9em;
      margin: 2px;
      line-height: 1em;
      border-radius: 3px;
      white-space: nowrap;

      i {
        font-weight: bold;
        margin-left: 5px;
        cursor: pointer;
      }
    }
  }
}
</style>
