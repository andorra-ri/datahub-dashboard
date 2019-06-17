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
							<button><i class="icon mdi mdi-settings" /> Settings</button>
							<button><i class="icon mdi mdi-settings" /></button>
							<button class="outline">
								<i class="icon mdi mdi-settings" />
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
							<button class="danger">Danger</button>
							<button class="fluid">
								<i class="icon mdi mdi-settings" /> Settings
							</button>
						</section>
					</div>
				</div>
				<div class="row">
					<div class="column">
						<section class="card card--round">
							<h2>Forms</h2>
							<form class="grid">
								<div class="row">
									<div class="column col-3">
										<label class="input fluid">
											<input type="text" placeholder="Input" />
										</label>
									</div>
									<div class="column col-3">
										<label class="input fluid">
											<input type="text" placeholder="Focused" autofocus/>
										</label>
									</div>
									<div class="column col-3">
										<label class="input fluid invalid">
											<input type="text" placeholder="Invalid" required />
										</label>
									</div>
									<div class="column col-3">
										<label class="input fluid disabled">
											<input type="text" placeholder="Disabled" />
										</label>
									</div>
								</div>
								<div class="row">
									<div class="column col-2">
										<label class="input fluid">
											<i class="icon mdi mdi-arrow-down-bold-box"></i>
											<input type="text" placeholder="Icon" />
										</label>
									</div>
									<div class="column col-2">
										<label class="input fluid">
											<input type="text" placeholder="Icon" />
											<i class="icon mdi mdi-arrow-down-bold-box"></i>
										</label>
									</div>
									<div class="column col-3">
										<label class="input fluid">
											<span class="label">http://</span>
											<input type="text" placeholder="Label" />
										</label>
									</div>
									<div class="column col-2">
										<label class="input fluid">
											<input type="text" placeholder="Label" />
											<span class="label">&euro;</span>
										</label>
									</div>
									<div class="column col-3">
										<label class="input fluid">
											<span class="label">&euro;</span>
											<i class="icon mdi mdi-arrow-down-bold-box"></i>
											<input type="text" placeholder="Icon + Label" />
										</label>
									</div>
								</div>
								<div class="row">
									<div class="column col-3">
										<dropdown
											v-model="framework"
											:options="frameworks"
											class="fluid" />
									</div>
									<div class="column col-3">
										<dropdown
											v-model="country"
											:options="countries"
											class="fluid"
											placeholder="Country"
											searchable
											clearable />
									</div>
									<div class="column col-3">
										<dropdown
											v-model="allies"
											:options="countries"
											class="fluid"
											placeholder="Country"
											searchable
											clearable
											multiple />
									</div>
									<div class="column col-3">
										<dropdown
											v-model="framework"
											:options="frameworks"
											class="fluid"
											disabled />
									</div>
								</div>
								<div class="row">
									<div class="column col-12">
										<fieldset class="group fluid">
											<label class="input">
												<input type="text" placeholder="Input" />
											</label>
											<label class="input">
												<i class="icon mdi mdi-arrow-down-bold-box"></i>
												<input type="text" placeholder="Icon" />
											</label>
											<dropdown
												v-model="country"
												:options="countries"
												class="fluid"
												placeholder="Country"
												searchable
												clearable />
											<button>
												<i class="icon mdi mdi-cloud-upload" />
												Upload
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
									<div class="column col-4">
										<label>
											<span class="switch"><input type="checkbox"></span>
											WiFi
										</label>
										<label>
											<span class="switch"><input type="checkbox"></span>
											LoRa
										</label>
										<label>
											<span class="switch"><input type="checkbox" disabled /></span>
											ZigBee
										</label>
									</div>
								</div>
								<div class="row">
									<div class="column col-12">
										<input type="submit" value="Upload" class="btn" />
										<button>
											<i class="icon mdi mdi-cloud-upload" />
											Upload
										</button>
										<input type="submit" value="Cancel" class="btn outline" />
										<input type="submit" value="Delete" class="btn danger" />
									</div>
								</div>
							</form>
						</section>
					</div>
				</div>
				<div class="row">
					<div class="column col-8">
						<section class="card card--round">
							<h2>Calendars</h2>
							<calendar class="fluid" :not-after="new Date()" range />
						</section>
					</div>
					<div class="column col-4">
						<section class="card card--round">
						</section>
					</div>
				</div>
			</div>
		</main>
	</div>
</template>

<script>
import Dropdown from '@/components/Dropdown.vue';
import Calendar from '@/components/Calendar.vue';

export default {
	name: 'tourism',
	components: { Dropdown, Calendar },
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
			allies: [],
			radio: undefined,
			date: null,
		};
	},
};
</script>
