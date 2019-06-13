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
						</section>
					</div>
				</div>
			</div>
		</main>
	</div>
</template>

<script>
export default {
	name: 'tourism',
};
</script>
