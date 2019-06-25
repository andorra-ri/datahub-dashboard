<template lang="html">
	<div class="calendar">
		<header class="calendar__header">
			<i class=" mdi mdi-chevron-left calendar__prev" @click="varyMonth(-1)" />
			<span>{{ monthLabel }} {{ yearLabel }}</span>
			<i class="mdi mdi-chevron-right calendar__next" @click="varyMonth(1)" />
		</header>
		<ul class="calendar__weekdays">
			<li v-for="day in dayLabels" :key="day">{{ day }}</li>
		</ul>
		<ul class="calendar__days">
			<li
				v-for="(day, index) in monthDays"
				:key="index"
				:class="dayClass(day)"
				@click="selectDay(day)">
				{{ day.monthDay }}
			</li>
		</ul>
	</div>
</template>

<script>
const defaultLocale = {
	months: {
		short: ['GEN', 'FEBR', 'MARÇ', 'ABR', 'MAIG', 'JUNY', 'JUL', 'AG', 'SET', 'OCT', 'NOV', 'DES'],
		long: ['Gener', 'Febrer', 'Març', 'Abril', 'Maig', 'Juny', 'Juliol', 'Agost', 'Setembre', 'Octubre', 'Novembre', 'Desembre'],
	},
	weekdays: {
		short: ['DL', 'DT', 'DC', 'DJ', 'DV', 'DS', 'DG'],
		long: ['Dilluns', 'Dimarts', 'Dimecres', 'Dijous', 'Divendres', 'Dissabte', 'Diumenge'],
	},
};

const sameDates = (date, otherDate) => {
	if (!date || !otherDate) return false;
	return date.toDateString() === otherDate.toDateString();
};

const dateBetweenDates = (date, dateLimit1, dateLimit2) => {
	if (!dateLimit1 || !dateLimit2) return false;
	const limitTime1 = dateLimit1.getTime();
	const limitTime2 = dateLimit2.getTime();
	const dateTime = date.getTime();
	return (dateTime > limitTime1 && dateTime < limitTime2)
		|| (dateTime > limitTime2 && dateTime < limitTime1);
};

export default {
	name: 'calendar',
	props: {
		value: null,
		notBefore: { type: Date, default: null },
		notAfter: { type: Date, default: null },
		range: { type: Boolean, default: false },
	},
	data() {
		return {
			today: new Date(),
			cursor: new Date(),
			dates: [null, null],
		};
	},
	computed: {
		yearLabel() { return this.cursor.getFullYear(); },
		monthLabel() { return defaultLocale.months.long[this.cursor.getMonth()]; },
		dayLabels() { return defaultLocale.weekdays.short; },
		monthDays() {
			const begin = new Date(this.cursor.getFullYear(), this.cursor.getMonth(), 1);
			const end = new Date(this.cursor.getFullYear(), this.cursor.getMonth() + 1, 0);
			const firstMonday = new Date(begin);
			firstMonday.setDate(begin.getDate() - begin.getDay() + 1);
			const lastSunday = new Date(end);
			lastSunday.setDate(end.getDate() + (end.getDay() ? 8 - end.getDay() : 1));
			const monthDays = [];
			const date = new Date(firstMonday);
			while (date < lastSunday) {
				monthDays.push({
					date: new Date(date.getFullYear(), date.getMonth(), date.getDate()),
					monthDay: date.getDate(),
					blurred: date.getMonth() !== this.cursor.getMonth(),
					disabled: (this.notBefore && date < this.notBefore)
						|| (this.notAfter && date > this.notAfter),
				});
				date.setDate(date.getDate() + 1);
			}
			return monthDays;
		},
	},
	methods: {
		dayClass({ disabled, blurred, date }) {
			const [min, max] = this.dates;
			return ['calendar__day', {
				'calendar__day--disabled': disabled,
				'calendar__day--blurred': blurred,
				'calendar__day--selected': sameDates(date, min) || sameDates(date, max),
				'calendar__day--between-selected': dateBetweenDates(date, min, max),
				'calendar__day--today': sameDates(date, this.today),
			}];
		},
		selectDay({ disabled, date }) {
			if (disabled) return;
			if (this.range) {
				this.dates.shift();
				this.dates.push(date);
				if (this.dates[0] && this.dates[1]) {
					const orderedDates = [...this.dates].sort((a, b) => a.getTime() - b.getTime());
					this.$emit('input', orderedDates);
					this.$emit('select', orderedDates);
				}
			} else {
				this.dates = [date, date];
				this.$emit('input', date);
				this.$emit('select', date);
			}
			this.cursor = date;
		},
		varyMonth(months) {
			this.cursor = new Date(this.cursor.getFullYear(), this.cursor.getMonth() + months, 15);
		},
	},
};
</script>

<style lang="scss" scoped>
.calendar {
	display: inline-block;
	margin: 2px;
	padding: 10px;

	&.fluid { display: block; }

	&__header {
		font-weight: 700;
		padding: 15px 0;
		text-align: center;
	}

	&__prev,
	&__next {
		cursor: pointer;
		margin: 0 15px;
	}

	&__weekdays {
		display: grid;
		grid-template-columns: repeat(7, auto);

		li {
			font-size: 0.7em;
			line-height: 3em;
			text-align: center;
			text-transform: uppercase;
		}
	}

	&__days {
		display: grid;
		grid-template-columns: repeat(7, auto);
	}

	&__day {
		font-size: 0.9em;
		cursor: pointer;
		line-height: 3em;
		padding: 0 10px;
		text-align: center;

		&--today {
			color: #461ea3;
			font-weight: bold;
		}

		&--selected {
			background: #461ea3;
			color: #fff;
			cursor: default;
		}

		&--between-selected {
			background: lighten(#461ea3, 20%);
			color: #fff;
		}

		&--blurred { color: #dfe2e6; }

		&--disabled {
			background: #f8f8f8;
			color: #dfe2e6;
			cursor: not-allowed;
		}
	}
}
</style>
