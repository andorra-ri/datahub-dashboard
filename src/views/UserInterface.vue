<template lang="html">
	<div class="screen">
		<main class="content">
			<header class="header">
				<h1><em>SETTINGS</em>USER INTERFACE</h1>
			</header>
			<div class="grid">
				<div class="row">
					<div class="column">
						<section class="card card--round">
							<h2>Buttons</h2>
							<button>Settings</button>
							<button><i class="icon mdi mdi-vuejs" /> Settings</button>
							<button><i class="icon mdi mdi-settings" /></button>
							<button class="outline">
								<i class="icon mdi mdi-setting" />
								Settings
							</button>
							<button disabled><i class="icon mdi mdi-settings" /> Settings</button>
							<fieldset class="group">
								<button><i class="icon mdi mdi-vuejs" /></button>
								<button><i class="icon mdi mdi-angular" /></button>
								<button><i class="icon mdi mdi-react" /></button>
								<button><i class="icon mdi mdi-codepen" /></button>
							</fieldset>
							<fieldset class="group">
								<button class="outline"><i class="icon mdi mdi-vuejs" /></button>
								<button class="outline"><i class="icon mdi mdi-angular" /></button>
								<button class="outline"><i class="icon mdi mdi-react" /></button>
								<button class="outline"><i class="icon mdi mdi-codepen" /></button>
							</fieldset>
						</section>
					</div>
				</div>
				<div class="row">
					<div class="column">
						<section class="card card--round">
							<h2>Forms</h2>
							<div class="grid">
								<div class="row">
									<label class="column">
										<input type="text" placeholder="Input" />
									</label>
									<label class="column">
										<i class="icon mdi mdi-arrow-down-bold-box" />
										<input type="text" placeholder="Input" />
									</label>
									<label class="column">
										<input type="text" placeholder="Input" />
										<i class="icon mdi mdi-arrow-down-bold-box" />
									</label>
									<label class="column">
										<span class="label">http://</span>
										<input type="text" placeholder="Input" />
									</label>
									<label class="column">
										<input type="text" placeholder="Input" />
										<span class="label">&euro;</span>
									</label>
								</div>
								<div class="row">
									<div class="column col-2">
										<dropdown v-model="framework" :options="frameworks" />
									</div>
									<div class="column col-2">
										<dropdown v-model="country" :options="countries" searchable />
									</div>
								</div>
								<div class="row">
									<div class="column col-2">
										<label><input type="checkbox" checked> WiFi</label>
										<label><input type="checkbox"> Bluetooth</label>
										<label><input type="checkbox" disabled> LoRa</label>
										<label><input type="checkbox"> ZigBee</label>
									</div>
									<div class="column col-2">
										<label>
											<input type="radio" v-model="radio" value="good">
											Good
										</label>
										<label>
											<input type="radio" v-model="radio" value="cheap">
											Cheap
										</label>
										<label>
											<input type="radio" v-model="radio" value="fast">
											Fast
										</label>
									</div>
									<div class="column col-2">
										<label>
											<span class="toggle">
												<input type="checkbox" radio="">
											</span>
											WiFi
										</label>
										<label>
											<span class="toggle"><input type="checkbox"></span>
											Bluetooth
										</label>
										<label>
											<span class="toggle">
												<input type="checkbox" disabled>
											</span>
											LoRa
										</label>
									</div>
									<div class="column col-2">
										<label>
											<span class="toggle">
												<input type="radio" v-model="radio" value="good">
											</span>
											Good
										</label>
										<label>
											<span class="toggle">
												<input type="radio" v-model="radio" value="cheap">
											</span>
											Cheap
										</label>
										<label>
											<span class="toggle">
												<input type="radio" v-model="radio" value="fast">
											</span>
											Fast
										</label>
									</div>
								</div>
							</div>
						</section>
					</div>
				</div>
			</div>
		</main>
	</div>
</template>

<script>
import Dropdown from '@/components/Dropdown.vue';
export default {
	name: 'tourism',
	components: { Dropdown },
	data() {
		return {
			frameworks: [
				{ icon: 'mdi mdi-vuejs', value: 'vuejs', label: 'Vue' },
				{ icon: 'mdi mdi-angular', value: 'angular', label: 'Angular' },
				{ icon: 'mdi mdi-react', value: 'react', label: 'React' },
				{ icon: 'mdi mdi-codepen', value: 'codepen', label: 'Codepen' },
			],
			countries: [
				{ icon: 'flag flag-au', value: 'au', label: 'Australia' },
				{ icon: 'flag flag-ca', value: 'ca', label: 'Canada' },
				{ icon: 'flag flag-fr', value: 'fr', label: 'France' },
				{ icon: 'flag flag-gb', value: 'gf', label: 'Great Britain' },
				{ icon: 'flag flag-us', value: 'us', label: 'United States of America' },
				{ icon: 'flag flag-it', value: 'it', label: 'Italy' },
				{ icon: 'flag flag-de', value: 'de', label: 'Germany' },
				{ icon: 'flag flag-ad', value: 'ad', label: 'Andorra' },
			],
			framework: undefined,
			country: undefined,
			checkbox: false,
			radio: undefined,
			date: null,
		};
	},
};
</script>
