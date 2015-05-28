'use strict';

angular.module('lantern_www')
  .constant('constants', {
    DEFAULT_LANGCODE: 'en_US',
    LANGS: {

      // http://www.omniglot.com/language/names.htm
      en_US: {
        code: 'en_US',
        name: 'English',
        dir: 'ltr'
      }/*,
      tr: {
        code: 'tr',
        name: 'Türkçe',
        dir: 'ltr'
      },
      vi: {
        code: 'vi',
        name: 'Tiếng Việt', // that's a no-break space
        dir: 'ltr'
      },
      sl_SI: {
        code: 'sl_SI',
        name: 'Slovenščina',
        dir: 'ltr'
      }*/,
      ca: {
        code: 'ca',
        name: 'català',
        dir: 'ltr'
      },
      cs: {
        code: 'cs',
        name: 'čeština',
        dir: 'ltr'
      },
      de: {
        code: 'de',
        name: 'Deutsch',
        dir: 'ltr'
      },
      fr: {
        code: 'fr',
        name: 'Français', // that's a no-break space
        dir: 'ltr'
      },
      sk: {
        code: 'sk',
        name: 'slovenčina',
        dir: 'ltr'
      },
      sv: {
        code: 'sv',
        name: 'Svenska',
        dir: 'ltr'
      },
      ja: {
        code: 'ja',
        name: '日本語',
        dir: 'ltr'
      },
      nl: {
        code: 'nl',
        name: 'Nederlands',
        dir: 'ltr'
      },
      es: {
        code: 'es',
        name: 'español',
        dir: 'ltr'
      },
      pt_BR: {
        code: 'pt_BR',
        name: 'português',
        dir: 'ltr'
      },
      fa_IR: {
        code: 'fa_IR',
        name: 'فارسی',
        dir: 'rtl'
      },
      ar: {
        code: 'ar',
        name: 'العربية',
        dir: 'rtl'
      },
      ru_RU: {
        code: 'ru_RU',
        name: 'Русский язык', // that's a no-break space
        dir: 'ltr',
      },
      uk: {
        code: 'uk',
        name: 'Українська (діаспора)', // that's a no-break space
        dir: 'ltr',
      },
      uk_UA: {
        code: 'uk_UA',
        name: 'Українська (Україна)', // that's a no-break space
        dir: 'ltr',
      },
      zh_CN: {
        code: 'zh_CN',
        name: '中文',
        dir: 'ltr'
      }
    },
    GA_WEBPROP_ID: 'UA-21815217-1', // google analytics
    DOMAIN_TYPE_BY_DOMAIN: {
      'localhost': 'DEV',
      '127.0.0.1': 'DEV',
      '0.0.0.0': 'DEV',
      'ns.getlantern.org': 'CANONICAL',
      'getlantern.org': 'CANONICAL',
      'www.getlantern.org': 'CANONICAL',
      'getlantern.nodejitsu.com': 'CANONICAL',
      's3.amazonaws.com': 'MIRROR'
    },
    MIRROR_URL: 'https://s3.amazonaws.com/getlantern.org/index.html',

    BEWARE_OF_PHONIES_URLS: {
      en_US: 'https://github.com/getlantern/lantern/wiki/Making-Sure-Lantern-Is-Genuine#wiki-getlanternorg-official-mirror'
    },
    SIGNUP_URL: 'https://getlantern.us2.list-manage.com/subscribe/post?u=0ac18298d5d0330dcda8f48aa&id=f06770f311',
    FORUMS_URLS: {
      ar: 'https://groups.google.com/group/lantern-users-ar',
      en_US: 'https://groups.google.com/group/lantern-users-en',
      fa_IR: 'https://groups.google.com/group/lantern-users-fa',
      fr_CA: 'https://groups.google.com/group/lantern-users-fr',
      fr_FR: 'https://groups.google.com/group/lantern-users-fr',
      zh_CN: 'https://lanternforum.greatfire.org/',
    },
    DOCS_URL: 'https://github.com/getlantern/lantern/wiki',
    HELP_TRANSLATE_URL: 'https://github.com/getlantern/lantern/wiki/Translating-Lantern',
    PRIVACY_URL: 'https://github.com/getlantern/lantern/wiki/Privacy',
    GET_INVOLVED_URL: 'https://github.com/getlantern/lantern/wiki/Get-Involved',

    TWITTER_URL: 'https://twitter.com/getlantern',
    FACEBOOK_URL: 'https://www.facebook.com/getlantern',
    TUMBLR_URL: 'http://get-lantern.tumblr.com/',
    GITHUB_URL: 'https://github.com/getlantern/lantern',
    OSX_URL: 'https://raw.githubusercontent.com/getlantern/lantern-binaries/master/lantern-installer.dmg',
    OSX_BETA_URL: 'https://s3.amazonaws.com/lantern/lantern-installer-beta.dmg',
    WIN_BETA_URL: 'https://s3.amazonaws.com/lantern/lantern-installer-beta.exe',
    WIN_URL: 'https://raw.githubusercontent.com/getlantern/lantern-binaries/master/lantern-installer.exe',
    DEB_URL32: 'https://raw.githubusercontent.com/getlantern/lantern-binaries/master/lantern-installer-32.deb',
    DEB_URL64: 'https://raw.githubusercontent.com/getlantern/lantern-binaries/master/lantern-installer-64.deb',
    DEB_BETA_URL32: 'https://s3.amazonaws.com/lantern/lantern-installer-beta-32.deb',
    DEB_BETA_URL64: 'https://s3.amazonaws.com/lantern/lantern-installer-beta-64.deb',
    BETA_URL: 'https://github.com/getlantern/lantern/wiki/Lantern-Beta-Versions',
  // point this at the real data when it's ready, or point at a not found url
  // to test what happens if we can't reach the installer data or if we take
  // it down on purpose to temporarily disable public download:
  //INSTALLER_DATA_URL: '//s3.amazonaws.com/lantern-installers/latest.json'
  //INSTALLER_DATA_URL: '//s3.amazonaws.com/lantern-installers/dummy-latest.json'
  // local version handy for avoiding cross-origin requests in testing
  //INSTALLER_DATA_URL: '/data/dummy-latest.json'
  });
