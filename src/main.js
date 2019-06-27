import Vue from 'vue';
import 'reset-css'; // eslint-disable-line import/extensions
import '@mdi/font/css/materialdesignicons.css';
import App from './App.vue';
import router from './router';
import i18n from './locales/i18n';

Vue.config.productionTip = false;

new Vue({
	router,
	i18n,
	render: h => h(App),
}).$mount('#app');
