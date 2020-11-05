<template lang="html">
	<section class="card card--round">
		<h2>{{ $t('ui.form.title') }}</h2>
		<form class="grid">

			<!-- Inputs -->
			<!-- eslint-disable max-len -->
			<div class="row">
				<div class="column col-3">
					<label class="input fluid">
						<input
							type="text"
							:placeholder="$t('ui.form.input.placeholder.input')" />
					</label>
				</div>
				<div class="column col-3">
					<label class="input fluid">
						<input
							type="text"
							:placeholder="$t('ui.form.input.placeholder.focused')"
							autofocus />
					</label>
				</div>
				<div class="column col-3">
					<label class="input fluid invalid">
						<input
							type="text"
							:placeholder="$t('ui.form.input.placeholder.invalid')"
							required />
					</label>
				</div>
				<div class="column col-3">
					<label class="input fluid disabled">
						<input
							type="text"
							:placeholder="$t('ui.form.input.placeholder.disabled')" />
					</label>
				</div>
			</div>
			<div class="row">
				<div class="column col-2">
					<label class="input fluid">
						<i class="icon mdi mdi-arrow-down-bold-box"></i>
						<input
							type="text"
							:placeholder="$t('ui.form.input.placeholder.icon')" />
					</label>
				</div>
				<div class="column col-2">
					<label class="input fluid">
						<input
							type="text"
							:placeholder="$t('ui.form.input.placeholder.icon')" />
						<i class="icon mdi mdi-arrow-down-bold-box"></i>
					</label>
				</div>
				<div class="column col-3">
					<label class="input fluid">
						<span class="label">http://</span>
						<input
							type="text"
							:placeholder="$t('ui.form.input.placeholder.label')" />
					</label>
				</div>
				<div class="column col-2">
					<label class="input fluid">
						<input
							type="text"
							:placeholder="$t('ui.form.input.placeholder.label')" />
						<span class="label">&euro;</span>
					</label>
				</div>
				<div class="column col-3">
					<label class="input fluid">
						<span class="label">&euro;</span>
						<i class="icon mdi mdi-arrow-down-bold-box"></i>
						<input
							type="text"
							:placeholder="`${$t('ui.form.input.placeholder.label')} + ${$t('ui.form.input.placeholder.icon')}`" />
					</label>
				</div>
			</div>

			<!-- Dropdowns -->
			<div class="row">
				<div class="column col-3">
					<dropdown
						v-model="framework"
						:options="frameworks"
						:placeholder="$t('ui.form.input.placeholder.select')"
						class="fluid" />
				</div>
				<div class="column col-3">
					<dropdown
						v-model="country"
						:options="countries"
						class="fluid"
						:placeholder="$t('ui.form.input.placeholder.country')"
						searchable
						clearable />
				</div>
				<div class="column col-3">
					<dropdown
						v-model="allies"
						:options="countries"
						class="fluid"
						:placeholder="$t('ui.form.input.placeholder.country')"
						searchable
						clearable
						multiple />
				</div>
				<div class="column col-3">
					<dropdown
						v-model="framework"
						:options="frameworks"
						:placeholder="$t('ui.form.input.placeholder.select')"
						class="fluid"
						disabled />
				</div>
			</div>

			<!-- Option selectors -->
			<div class="row">
				<div class="column col-12">
					<fieldset class="group fluid">
						<label class="input">
							<input
								type="text"
								:placeholder="$t('ui.form.input.placeholder.input')" />
						</label>
						<label class="input">
							<i class="icon mdi mdi-arrow-down-bold-box"></i>
							<input
								type="text"
								:placeholder="$t('ui.form.input.placeholder.icon')" />
						</label>
						<dropdown
							v-model="country"
							:options="countries"
							class="fluid"
							:placeholder="$t('ui.form.input.placeholder.country')"
							searchable
							clearable />
						<button>
							<i class="icon mdi mdi-cloud-upload" />
							<span>{{ $t('ui.button.label.upload') }}</span>
						</button>
					</fieldset>
				</div>
			</div>
			<div class="row">
				<div class="column col-4">
					<label><input type="checkbox" checked> WiFi</label>
					<label><input type="checkbox"> LoRa</label>
					<label><input type="checkbox" disabled> ZigBee</label>
				</div>
				<div class="column col-4">
					<label><input type="radio" v-model="radio" value="good">Good</label>
					<label><input type="radio" v-model="radio" value="cheap">Cheap</label>
					<label><input type="radio" v-model="radio" value="fast">Fast</label>
				</div>
				<div class="column col-4">
					<label><span class="switch"><input type="checkbox"></span>WiFi</label>
					<label><span class="switch"><input type="checkbox"></span>LoRa</label>
					<label>
						<span class="switch"><input type="checkbox" disabled /></span>
						ZigBee
					</label>
				</div>
			</div>

			<!-- Buttons -->
			<div class="row">
				<div class="column col-12">
					<input type="submit" :value="$t('ui.button.label.upload')" class="btn" />
					<button>
						<i class="icon mdi mdi-cloud-upload" />
						<span>{{ $t('ui.button.label.upload') }}</span>
					</button>
					<input type="submit" :value="$t('ui.button.label.cancel')" class="btn btn--outline" />
					<input type="submit" :value="$t('ui.button.label.danger')" class="btn btn--danger" />
				</div>
			</div>

		</form>
	</section>
</template>

<script>
import Dropdown from '@/components/Dropdown.vue';

const countries = ['au', 'ca', 'fr', 'gb', 'us'];

export default {
	name: 'user-interface-forms',
	components: { Dropdown },
	data() {
		return {
			frameworks: [
				{ icon: 'mdi mdi-vuejs', value: 'vuejs', label: 'Vue' },
				{ icon: 'mdi mdi-angular', value: 'angular', label: 'Angular' },
				{ icon: 'mdi mdi-react', value: 'react', label: 'React' },
				{ icon: 'mdi mdi-codepen', value: 'codepen', label: 'Codepen' },
			],
			countries: countries.map(code => ({
				icon: `flag flag-${code}`,
				value: code,
				label: this.$t(`countries.${code}`),
			})),
			framework: undefined,
			country: undefined,
			allies: [],
			radio: undefined,
		};
	},
};
</script>
