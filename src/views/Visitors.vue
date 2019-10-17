<template lang="html">
	<div class="screen">
		<main class="content">
			<header class="header">
				<h1><em>{{ $t('visitors.section') }}</em>{{ $t('visitors.title') }}</h1>
				<p>{{ $d(datesRange.since, 'long') }} - {{ $d(datesRange.until, 'long') }}</p>
			</header>
			<div class="grid">
				<div class="row">
					<div class="column">
						<visitors-historic :dates="datesRange" :filters="filters" />
					</div>
				</div>
				<div class="row">
					<div class="column col-6">
						<visitors-ranking :filters="filters" />
					</div>
					<div class="column col-6">
					</div>
				</div>
			</div>
		</main>
		<visitors-filters @update="updateFilters" />
	</div>
</template>

<script>
import VisitorsRanking from '@/views/Visitors/VisitorsRanking.vue';
import VisitorsHistoric from '@/views/Visitors/VisitorsHistoric.vue';
import VisitorsFilters from '@/views/Visitors/VisitorsFilters.vue';

const sameDates = (date, otherDate) => {
	if (!date || !otherDate) return false;
	return date.toDateString() === otherDate.toDateString();
};

export default {
	name: 'visitors',
	components: {
		VisitorsHistoric,
		VisitorsRanking,
		VisitorsFilters,
	},
	data() {
		return {
			datesRange: {},
			filters: {},
		};
	},
	methods: {
		updateFilters(newFilters) {
			const { since: prevSince, until: prevUntil } = this.datesRange;
			const { datesRange: [since, until] = [], ...filters } = newFilters;
			if (!sameDates(since, prevSince) || !sameDates(until, prevUntil)) {
				this.datesRange = { since, until };
			}
			this.filters = filters;
		},
	},
};
</script>
