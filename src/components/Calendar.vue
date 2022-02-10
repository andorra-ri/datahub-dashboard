<template>
  <div class="calendar">
    <header class="header">
      <i class=" mdi mdi-chevron-left prev" @click="changeMonth(-1)" />
      <span>{{ labels.month }} {{ labels.year }}</span>
      <i class="mdi mdi-chevron-right next" @click="changeMonth(1)" />
    </header>
    <ul class="weekdays">
      <li v-for="day in labels.weekdays" :key="day">{{ day }}</li>
    </ul>
    <ul class="days">
      <li
        v-for="day in days"
        :key="day.date"
        :class="day.classes"
        @click="select(day)">
        {{ day.label }}
      </li>
    </ul>
  </div>
</template>

<script>
import { ref, computed, watch } from 'vue';
import {
  add,
  eachDayOfInterval,
  startOfWeek,
  endOfWeek,
  startOfMonth,
  endOfMonth,
  isWithinInterval,
  isSameDay,
  isSameMonth,
  isAfter,
  isBefore,
} from 'date-fns';

export default {
  name: 'Calendar',
  props: {
    modelValue: { type: [Date, Array], required: true },
    notBefore: { type: Date, default: null },
    notAfter: { type: Date, default: null },
    locale: { type: String, default: 'en' },
  },
  emits: ['update:modelValue', 'select'],
  setup(props, { emit }) {
    const cursor = ref(new Date());

    const labels = computed(() => {
      const year = cursor.value.getFullYear();
      const month = cursor.value.toLocaleString(props.locale, { month: 'long' });
      const weekdays = eachDayOfInterval({
        start: startOfWeek(cursor.value, { weekStartsOn: 1 }),
        end: endOfWeek(cursor.value, { weekStartsOn: 1 }),
      }).map(day => day.toLocaleString(props.locale, { weekday: 'short' }));
      return { year, month, weekdays };
    });

    const days = computed(() => {
      const start = startOfWeek(startOfMonth(cursor.value), { weekStartsOn: 1 });
      const end = endOfWeek(endOfMonth(cursor.value), { weekStartsOn: 1 });
      const selected = Array.isArray(props.modelValue)
        ? [...props.modelValue].sort((a, b) => a - b)
        : [props.modelValue, props.modelValue];
      return eachDayOfInterval({ start, end }).map(date => {
        const label = date.getDate();
        const disabled = isBefore(date, props.notBefore) || isAfter(date, props.notAfter);
        const classes = ['day', {
          'day--disabled': disabled,
          'day--faded': !isSameMonth(date, cursor.value),
          'day--selected': isSameDay(date, selected[0]) || isSameDay(date, selected[1]),
          'day--between': isWithinInterval(date, { start: selected[0], end: selected[1] }),
        }];
        return { date, label, disabled, classes };
      });
    });

    watch(() => props.modelValue, value => {
      cursor.value = Array.isArray(value) ? value[1] : value;
    });

    const select = ({ disabled, date }) => {
      if (disabled) return;
      // Range calendar
      if (Array.isArray(props.modelValue)) {
        const [, last] = props.modelValue;
        if (last && date) {
          const dates = [last, date];
          emit('update:modelValue', dates);
          emit('select', dates);
        }
      // Single day calendar
      } else {
        emit('update:modelValue', date);
        emit('select', date);
      }
      cursor.value = date;
    };

    const changeMonth = months => {
      cursor.value = add(cursor.value, { months });
    };

    return { cursor, days, labels, select, changeMonth };
  },
};
</script>

<style lang="scss" scoped>
.calendar {
  display: inline-block;
  margin: 5px auto;

  &.fluid { display: block; }

  .header {
    font-weight: 700;
    padding: 10px 0;
    display: flex;

    span {
      margin: auto;
      text-transform: uppercase;
    }
  }

  .prev,
  .next {
    cursor: pointer;
    margin: 0 15px;
  }

  .weekdays {
    display: grid;
    grid-template-columns: repeat(7, auto);

    li {
      font-size: 0.75em;
      line-height: 3em;
      text-align: center;
      text-transform: uppercase;
    }
  }

  .days {
    display: grid;
    grid-template-columns: repeat(7, auto);
  }

  .day {
    cursor: pointer;
    line-height: 2.5em;
    padding: 0 9px;
    text-align: center;

    &--today {
      color: var(--color-primary);
      font-weight: bold;
    }

    &--between {
      background: var(--color-secondary);
      color: #fff;
    }

    &--selected {
      background: var(--color-primary) !important;
      color: #fff;
      cursor: default;
    }

    &--faded { opacity: 0.5; }

    &--disabled {
      background: #f8f8f8;
      color: #dfe2e6;
      cursor: not-allowed;
    }
  }
}
</style>
