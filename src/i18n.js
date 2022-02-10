import { createI18n } from 'vue-i18n';
import messages from '@intlify/vite-plugin-vue-i18n/messages'; // eslint-disable-line import/no-unresolved

export default createI18n({
  locale: 'ca',
  fallbackLocale: 'ca',
  messages,
});
