import { Locale } from 'lib/redux/app/types';

const locales: Locale[] = ['en', 'fr'];
const namespaces = ['common'];

const getResources = () => {
  const resources: any = {};
  for (const locale of locales) {
    resources[locale] = {};
    for (const ns of namespaces) {
      resources[locale][ns] = require(`./locales/${locale}/${ns}.json`);
    }
  }
  return resources;
};

const config: any = {
  defaultNS: 'common',
  fallbackNS: namespaces,
  ns: namespaces,

  fallbackLng: locales[0],
  supportedLngs: locales,
  preload: locales,
  load: 'languageOnly',

  backend: {
    loadPath: '/locales/{{lng}}/{{ns}}.json',
  },

  resources: getResources(),

  // This option is necessary to tell i18next to try loading missing resources via
  // i18next-http-backend, otherwise no calls will be made if resources are defined.
  partialBundledLanguages: true,

  react: {
    useSuspense: true,
    wait: true,
  },

  detection: {
    // order and from where user language should be detected
    order: [
      'querystring',
      'cookie',
      'localStorage',
      'sessionStorage',
      'navigator',
    ],

    // keys or params to lookup language from
    lookupQuerystring: 'lng',
    lookupCookie: 'i18next',
    lookupLocalStorage: 'i18nextLng',
    lookupSessionStorage: 'i18nextLng',
    lookupFromPathIndex: 0,
    lookupFromSubdomainIndex: 0,

    // cache user language on
    caches: ['localStorage', 'cookie'],
    excludeCacheFor: ['cimode'], // languages to not persist (cookie, localStorage)

    // optional expire and domain for set cookie
    // cookieMinutes: 10,
    // cookieDomain: 'myDomain',
  },

  debug: process.env.NODE_ENV === 'development' && __BROWSER__,

  parseMissingKeyHandler: (missing: any) => {
    if (process.env.NODE_ENV === 'development' && __BROWSER__) {
      console.warn('Missing translation :', missing);
    }
    return missing;
  },
};

export default config;