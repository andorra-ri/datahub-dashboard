<template lang="html">
	<section class="card card--round">
		<h2>{{ $t('ui.calendar.title') }}</h2>
		<calendar class="fluid" :not-after="new Date()" range />
	</section>
</template>

<script>
import Calendar from '@/components/Calendar.vue';

export default {
	name: 'user-interface-calendars',
	components: { Calendar },
	data() {
		return { date: null };
	},
};
</script>
