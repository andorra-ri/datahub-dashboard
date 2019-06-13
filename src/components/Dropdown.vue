<template>
	<div class="dropdown">
		<a href="#" tabindex="0" @click.prevent :class="toggleClasses">
			<i v-if="selected.icon" :class="`icon ${selected.icon}`" />
			{{ selected.label }}
			<i class="chevron mdi mdi-chevron-down"></i>
		</a>
		<ul class="dropdown__options">
			<div v-if="searchable" class="dropdown__search">
				<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" class="icon">
					<circle cx="11" cy="11" r="8" />
					<line x1="21" y1="21" x2="16.65" y2="16.65" />
				</svg>
				<input type="text" v-model="search" />
			</div>
			<li v-for="option in filteredOptions" :key="option.label" @click="select(option)">
				<i v-if="option.icon" :class="`icon ${option.icon}`" />
				{{ option.label }}
			</li>
		</ul>
	</div>
</template>

<script>
const normalize = str => str.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase();

export default {
	name: 'dropdown',
	props: {
		options: { type: Array, required: true },
		value: { required: true },
		placeholder: { type: String, default: 'Select...' },
		searchable: { type: Boolean, default: false },
	},
	data() {
		return { search: undefined };
	},
	computed: {
		selected() {
			return this.options.find(({ value }) => this.value === value)
				|| { label: this.placeholder };
		},
		toggleClasses() {
			return ['dropdown__toggle', { 'dropdown__toggle--selected': this.value }];
		},
		filteredOptions() {
			const search = this.search && normalize(this.search);
			return search
				? this.options.filter(({ label }) => normalize(label).includes(search))
				: this.options;
		},
	},
	methods: {
		select({ value }) {
			this.$emit('input', value);
		},
	},
};
</script>

<style lang="scss" scoped>
.dropdown {
	display: inline-block;
	position: relative;
	vertical-align: middle;

	&__toggle {
		align-items: center;
		background: #fff;
		border: 1px solid #a5acb6;
		border-radius: 3px;
		color: #aaaaaa;
		display: flex;
		line-height: 30px;
		margin: 2px;
		min-width: 150px;
		outline: 0;
		padding: 0 10px;
		text-decoration: none;
		white-space: nowrap;

		&--selected { color: #000 !important; }
		.chevron {
			margin-left: auto;
			padding-left: 5px;
		}
	}

	&__options {
		background: #fff;
		border: 1px solid #a5acb6;
		border-radius: 5px;
		// box-shadow: 0 0 10px rgba(#000000, 0.1);
		display: none;
		left: 2px;
		min-width: 170px;
		max-height: 193px;
		overflow: auto;
		position: absolute;
		top: 100%;
		z-index: 1;

		&:hover,
		:focus + & { display: block; }

		li {
			align-items: center;
			border-radius: 3px;
			color: inherit;
			cursor: pointer;
			display: flex;
			line-height: 1.3em;
			padding: 7px 12px;
			white-space: nowrap;
			margin: 0 5px;

			&:first-of-type { margin-top: 5px; }
			&:last-of-type { margin-bottom: 5px; }

			&:hover {
				background: #461ea3;
				color: #fff;
			}
		}
	}

	&__search {
		align-items: center;
		background: #fff;
		color: #a5acb6;
		border-bottom: 1px solid #a5acb6;
		display: flex;
		font-size: 0.9em;
		padding: 5px;
		position: sticky;
		top: 0;

		input {
			appearance: none;
			border: 0;
			color: inherit;
			flex: 1;
			font-size: inherit;
			line-height: 1.5em;
			outline: 0;
		}

		.icon {
			height: 14px;
			width: 14px;
			fill: none;
			stroke: currentColor;
			stroke-width: 2;
			margin: 0 5px !important;
		}

	}

	.icon { margin-right: 7px }
}
</style>
