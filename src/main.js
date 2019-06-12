import Vue from 'vue';
import 'reset-css'; // eslint-disable-line import/extensions
import '@mdi/font/css/materialdesignicons.css';
import App from './App.vue';
import router from './router';

Vue.config.productionTip = false;

new Vue({
	router,
	render: h => h(App),
}).$mount('#app');
