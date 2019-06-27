<template lang="html">
	<div class="screen">
		<main class="content">
			<header class="header">
				<h1><em>{{ $t('visitors.section') }}</em>{{ $t('visitors.title') }}</h1>
			</header>
			<div class="grid">
				<div class="row">
					<div class="column">
						<visitors-historic />
					</div>
				</div>
			</div>
		</main>
	</div>
</template>

<script>
import VisitorsHistoric from '@/views/Visitors/VisitorsHistoric.vue';

export default {
	name: 'visitors',
	components: {
		VisitorsHistoric,
	},
};
</script>
