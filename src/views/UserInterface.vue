<template lang="html">
	<div class="screen">
		<main class="content">
			<header class="header">
				<h1><em>SETTINGS</em>USER INTERFACE</h1>
			</header>
			<div class="grid">
				<div class="row">
					<div class="column">
						<user-interface-buttons />
					</div>
				</div>
				<div class="row">
					<div class="column">
						<user-interface-forms />
					</div>
					<div class="column col-4">
						<user-interface-calendars />
					</div>
				</div>
				<div class="row">
					<div class="column">
						<user-interface-charts />
					</div>
				</div>
				<div class="row">
					<div class="column col-4">
						<user-interface-loading />
					</div>
					<div class="column col-4">
						<user-interface-ranking />
					</div>
				</div>
			</div>
		</main>
	</div>
</template>

<script>
import UserInterfaceButtons from './UserInterface/UserInterfaceButtons.vue';
import UserInterfaceForms from './UserInterface/UserInterfaceForms.vue';
import UserInterfaceCalendars from './UserInterface/UserInterfaceCalendars.vue';
import UserInterfaceCharts from './UserInterface/UserInterfaceCharts.vue';
import UserInterfaceLoading from './UserInterface/UserInterfaceLoading.vue';
import UserInterfaceRanking from './UserInterface/UserInterfaceRanking.vue';

export default {
	name: 'tourism',
	components: {
		UserInterfaceButtons,
		UserInterfaceForms,
		UserInterfaceCalendars,
		UserInterfaceCharts,
		UserInterfaceLoading,
		UserInterfaceRanking,
	},
};
</script>
