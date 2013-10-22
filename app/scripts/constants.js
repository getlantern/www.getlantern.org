'use strict';

angular.module('GetLanternSiteApp')
  .constant('constants', {
    DEFAULT_LANGCODE: 'en_US',
    LANGS: {
      en_US: {
        code: 'en_US',
        name: 'English',
        dir: 'ltr'
      },
      tr: {
        code: 'tr',
        name: 'Türkçe',
        dir: 'ltr'
      },
      vi: {
        code: 'vi',
        name: 'Tiếng Việt',
        dir: 'ltr'
      },
      sl_SI: {
        code: 'sl_SI',
        name: 'Slovenščina',
        dir: 'ltr'
      },
      fr_FR: {
        code: 'fr_FR',
        name: 'Français',
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
      zh_CN: {
        code: 'zh_CN',
        name: '中文',
        dir: 'ltr'
      }
    },
    GA_ACCOUNT_ID: 'UA-21815217-1', // google analytics
    SIGNUP_URL: 'https://getlantern.us2.list-manage.com/subscribe/post?u=0ac18298d5d0330dcda8f48aa&id=f06770f311',
    FORUMS_URL: 'https://groups.google.com/group/lantern-users-en',
    DOCS_URL: 'https://github.com/getlantern/lantern/wiki',
    HELP_TRANSLATE_URL: 'https://github.com/getlantern/lantern/wiki/Translating-Lantern',
    DEVELOPERS_URL: 'https://github.com/getlantern/lantern'

  // point this at the real data when it's ready, or point at a not found url
  // to test what happens if we can't reach the installer data or if we take
  // it down on purpose to temporarily disable public download:
  //INSTALLER_DATA_URL: '//s3.amazonaws.com/lantern-installers/latest.json'
  //INSTALLER_DATA_URL: '//s3.amazonaws.com/lantern-installers/dummy-latest.json'
  // local version handy for avoiding cross-origin requests in testing
  //INSTALLER_DATA_URL: '/data/dummy-latest.json'
  });
