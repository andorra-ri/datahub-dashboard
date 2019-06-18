<template lang="html">
	<section class="card card--round">
		<h2>Charts</h2>
		<div class="grid">
			<div class="row">
			</div>
		</div>
	</section>
</template>

<script>
import ApexChart from 'vue-apexcharts';
import { apexOptions, mergeDeep } from '@/utils/charts/apexOptions';

export default {
	name: 'user-interface-charts',
	components: { ApexChart },
	data() {
		return {
		};
	},
};
</script>
