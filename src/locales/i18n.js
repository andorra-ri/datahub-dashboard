import Vue from 'vue';
import VueI18n from 'vue-i18n';

/* Import translations */
import dateTimeFormats from './dateTimeFormats';
import ca from './ca/index';

const messages = { ca };

Vue.use(VueI18n);

export default new VueI18n({
	locale: 'ca',
	fallbackLocale: 'ca',
	dateTimeFormats,
	messages,
});
