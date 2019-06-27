<template lang="html">
	<section class="card card--round">
		<h2>{{ $t('ui.button.title') }}</h2>
		<button>{{ $t('ui.button.label.settings') }}</button>
		<button>
			<i class="icon mdi mdi-settings" />
			<span>{{ $t('ui.button.label.settings') }}</span>
		</button>
		<button>
			<span>{{ $t('ui.settings') }}</span>
			<i class="icon mdi mdi-settings" />
		</button>
		<button><i class="icon mdi mdi-settings" /></button>
		<button class="btn--outline">
			<i class="icon mdi mdi-settings" />
			<span>{{ $t('ui.button.label.settings') }}</span>
		</button>
		<button disabled>
			<i class="icon mdi mdi-settings" />
			<span>{{ $t('ui.button.label.settings') }}</span>
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
		<button class="btn--danger">{{ $t('ui.button.label.danger') }}</button>
		<button class="fluid">
			<i class="icon mdi mdi-settings" />
			<span>{{ $t('ui.button.label.settings') }}</span>
		</button>
	</section>
</template>
