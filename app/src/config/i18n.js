import i18n from 'i18n-js';

import en from '../locals/en/translation.json';
import es from '../locals/es/translation.json';

i18n.defaultLocale = 'en';
i18n.locale = 'en';
i18n.fallbacks = true;
i18n.translations = { en, es };

export default i18n;
