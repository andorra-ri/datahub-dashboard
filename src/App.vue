<template>
	<div id="app">
		<nav-bar />
		<router-view />
	</div>
</template>

<script>
import NavBar from '@/components/NavBar.vue';

export default {
	name: 'innohub',
	components: { NavBar },
};
</script>

<style lang="scss">
</style>
