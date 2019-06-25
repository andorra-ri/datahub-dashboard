<template lang="html">
	<section class="card card--round">
		<h2>Buttons</h2>
		<button>Settings</button>
		<button>
			<i class="icon mdi mdi-settings" />
			<span>Settings</span>
		</button>
		<button>
			<span>Settings</span>
			<i class="icon mdi mdi-settings" />
		</button>
		<button><i class="icon mdi mdi-settings" /></button>
		<button class="btn--outline">
			<i class="icon mdi mdi-settings" />
			<span>Settings</span>
		</button>
		<button disabled>
			<i class="icon mdi mdi-settings" />
			<span>Settings</span>
		</button>
		<fieldset class="group">
			<button><i class="icon mdi mdi-vuejs" /></button>
			<button><i class="icon mdi mdi-angular" /></button>
			<button><i class="icon mdi mdi-react" /></button>
			<button><i class="icon mdi mdi-codepen" /></button>
		</fieldset>
		<fieldset class="group">
			<button class="btn--outline"><i class="icon mdi mdi-vuejs" /></button>
			<button class="btn--outline"><i class="icon mdi mdi-angular" /></button>
			<button class="btn--outline"><i class="icon mdi mdi-react" /></button>
			<button class="btn--outline"><i class="icon mdi mdi-codepen" /></button>
		</fieldset>
		<button class="danger">Danger</button>
		<button class="fluid">
			<i class="icon mdi mdi-settings" />
			<span>Settings</span>
		</button>
	</section>
</template>
