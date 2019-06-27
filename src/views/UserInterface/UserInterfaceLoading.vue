<template lang="html">
  <section :class="['card', 'card--round', { 'loading': loading }]">
		<h2>{{ $t('ui.load_spinner.title') }}</h2>
		<p>{{ $t('ui.load_spinner.description') }}</p>
		<p><img src="https://picsum.photos/300/200?grayscale" :key="updateTime" /></p>
		<p>
			<button @click="load">
				<i class="icon mdi mdi-reload" />
				<span>{{ $t('ui.button.label.reload') }}</span>
			</button>
		</p>
	</section>
</template>

<script>
export default {
	name: 'user-interface-loading',
	data() {
		return {
			loading: false,
			updateTime: null,
		};
	},
	methods: {
		load() {
			this.loading = true;
			setTimeout(() => {
				this.updateTime = new Date();
				this.loading = false;
			}, 2000);
		},
	},
};
</script>
