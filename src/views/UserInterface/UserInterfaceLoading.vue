<template lang="html">
  <section :class="['card', 'card--round', { 'loading': loading }]">
		<h2>Loading</h2>
		<p>Spinner indicator for loading content</p>
		<p><img src="https://picsum.photos/300/200?grayscale" :key="updateTime" /></p>
		<p>
			<button @click="load">
				<i class="icon mdi mdi-reload" />
				<span>Load new image</span>
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
