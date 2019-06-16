<template>
	<div class="dropdown">
		<label :class="['input', { 'selected': value, 'disabled': disabled }]">
			<i v-if="selected.icon" :class="`icon ${selected.icon}`" />
			<input
				type="text"
				:placeholder="selected.label"
				v-model="search"
				:readonly="!searchable" />
			<i :class="`icon mdi mdi-${isClearable ? 'close' : 'chevron-down'}`" @click="clear()" />
			<ul v-if="!disabled" class="dropdown__options">
				<li v-for="option in filteredOptions" :key="option.label" @click="select(option)">
					<i v-if="option.icon" :class="`icon ${option.icon}`" />
					{{ option.label }}
				</li>
			</ul>
		</label>
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
		disabled: { type: Boolean, default: false },
		clearable: { type: Boolean, default: false },
	},
	data() {
		return { search: undefined };
	},
	computed: {
		selected() {
			const selected = this.options.find(({ value }) => this.value === value);
			return selected || { label: this.placeholder };
		},
		filteredOptions() {
			const search = this.search && normalize(this.search);
			return search
				? this.options.filter(({ label }) => normalize(label).includes(search))
				: this.options;
		},
		isClearable() { return this.clearable && this.value; },
	},
	methods: {
		clear() {
			if (this.isClearable) this.select({ value: undefined });
		},
		select({ value }) {
			this.search = '';
			this.$emit('input', value);
		},
	},
};
</script>

<style lang="scss" scoped>
.dropdown {
	display: inline-block;
	position: relative;

	// Options
	.input.selected input::placeholder { color: inherit; }

	&.fluid {
		display: block;
		.input { width: 100%; }
	}

	// Components
	&__options {
		background: #fff;
		border: 1px solid #a5acb6;
		border-radius: 5px;
		// box-shadow: 0 0 10px rgba(#000000, 0.1);
		display: none;
		left: 2px;
		min-width: 150px;
		max-height: 193px;
		overflow: auto;
		padding: 5px;
		position: absolute;
		top: 100%;
		z-index: 1;

		// Components
		li {
			align-items: center;
			border-radius: 3px;
			color: inherit;
			cursor: pointer;
			display: flex;
			line-height: inherit;
			padding: 0 12px;
			white-space: nowrap;

			// Components
			.icon { margin-left: 0; }

			// State
			&:hover {
				background: #461ea3;
				color: #fff;
			}
		}

		// State
		&:hover,
		:focus ~ & { display: block; }
	}
}
</style>
