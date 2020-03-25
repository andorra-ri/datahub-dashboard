<template>
	<div class="dropdown">
		<label :class="['input', { 'input--active': !multiple && value, 'disabled': disabled }]">
			<i v-if="selected.icon" :class="`icon ${selected.icon}`" />
			<input
				type="text"
				:placeholder="selected.label"
				v-model="search"
				:readonly="!searchable" />
			<i :class="`icon mdi mdi-${isClearable ? 'close' : 'chevron-down'}`" @click="clear()" />
			<ul v-if="!disabled" :class="`dropdown__options dropdown__options--${dir}`">
				<li v-for="option in filteredOptions" :key="option.label" @click="select(option)">
					<i v-if="option.icon" :class="`icon ${option.icon}`" />
					{{ option.label }}
				</li>
				<p v-if="!filteredOptions.length" class="no-options">No results found</p>
			</ul>
		</label>
		<ul v-if="multiple" class="dropdown__tags">
			<li v-for="option in value" :key="option.label">
				{{ option.label }}
				<i @click="unselect(option)">&times;</i>
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
		disabled: { type: Boolean, default: false },
		clearable: { type: Boolean, default: false },
		multiple: { type: Boolean, default: false },
		dir: { type: String, default: 'down' },
	},
	data() {
		return { search: undefined };
	},
	computed: {
		selected() {
			return !this.value || this.multiple ? { label: this.placeholder } : this.value;
		},
		filteredOptions() {
			const search = this.search && normalize(this.search);
			return this.options.filter((option) => {
				const searchMatch = search ? normalize(option.label).includes(search) : true;
				return searchMatch && !this.isSelected(option);
			});
		},
		isClearable() {
			return this.clearable && this.isSelected();
		},
	},
	methods: {
		clear() {
			if (this.isClearable) {
				this.search = '';
				this.$emit('input', this.multiple ? [] : undefined);
			}
		},
		isSelected(option) {
			if (!option) return this.multiple ? this.value.length : this.value;
			return Array.isArray(this.value)
				? this.value.find(({ label }) => label === option.label)
				: this.value && this.value.label === option.label;
		},
		select(option) {
			this.search = '';
			this.$emit('input', this.multiple ? [...new Set([...this.value, option])] : option);
		},
		unselect(option) {
			this.$emit('input', this.value.filter(({ value }) => value !== option.value));
		},
	},
};
</script>

<style lang="scss" scoped>
.dropdown {
	display: inline-block;

	// Options
	.input {
		position: relative;
		overflow: visible;
		&--active input::placeholder { color: inherit; }
	}

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
		left: 0;
		margin: 3px 0;
		max-height: 193px;
		min-width: 150px;
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

		.no-options { padding: 0 12px; }

		// State
		&:hover,
		:focus ~ & { display: block; }
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
