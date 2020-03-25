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
						<visitors-summary :dates="datesRange" :filters="filters" />
					</div>
				</div>
				<div class="row">
					<div class="column">
						<visitors-historic :dates="datesRange" :filters="filters" />
					</div>
				</div>
				<div class="row">
					<div class="column col-6">
						<visitors-ranking :dates="datesRange" :filters="filters" />
					</div>
					<div class="column col-6">
						<visitors-stats :dates="datesRange" />
					</div>
				</div>
			</div>
		</main>
		<visitors-filters @update="updateFilters" />
	</div>
</template>

<script>
import VisitorsSummary from '@/views/Visitors/VisitorsSummary.vue';
import VisitorsRanking from '@/views/Visitors/VisitorsRanking.vue';
import VisitorsHistoric from '@/views/Visitors/VisitorsHistoric.vue';
import VisitorsStats from '@/views/Visitors/VisitorsStats.vue';
import VisitorsFilters from '@/views/Visitors/VisitorsFilters.vue';

const sameDates = (date, otherDate) => {
	if (!date || !otherDate) return false;
	return date.toDateString() === otherDate.toDateString();
};

export default {
	name: 'visitors',
	components: {
		VisitorsSummary,
		VisitorsHistoric,
		VisitorsRanking,
		VisitorsStats,
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
