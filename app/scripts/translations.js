'use strict';

angular.module('GetLanternSiteApp', ['pascalprecht.translate'], ['$translateProvider',
  function ($translateProvider) {
    $translateProvider.translations('en_EN', {
      FREE_THE_INTERNET: 'Free the Internet',
      SECURELY_SHARE: 'Securely share your connection to defeat censorship',
      LATEST_INSTALLER_DATA_LOADING_FAILED: 'Could not load latest installer data. Please check your connection and try reloading the page.',
      DOWNLOAD_LANTERN: 'Download Lantern',
      VERSION: 'Version',
      RELEASED: 'Released',
      OSX: 'Mac OS X',
      WINDOWS: 'Windows',
      UBUNTU32: 'Ubuntu 32-bit',
      UBUNTU64: 'Ubuntu 64-bit',
      UNKNOWNOS: '(unknown operating system)',
      OTHER_SYSTEMS: 'Other systems',

      LINKTEXT_FORUMS: 'Forums',
      LINKTEXT_DOCS: 'Docs',
      LINKTEXT_DEVELOPERS: 'Developers'
    });

    $translateProvider.preferredLanguage('en_EN');
  }
]);
