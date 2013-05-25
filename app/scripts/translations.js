'use strict';

angular.module('GetLanternSiteApp', ['pascalprecht.translate'], ['$translateProvider',
  function ($translateProvider) {
    $translateProvider.translations('en_EN', {
      LANTERN: 'Lantern',
      BETA: 'Beta',
      FREE_THE_INTERNET: 'Free the Internet',
      SECURELY_SHARE: 'Securely share your connection to defeat censorship',
      CHECK_BACK_SOON: 'Check back again soon to download Lantern.',
      DOWNLOAD_LANTERN: 'Download Lantern',
      CHOOSE_SYSTEM: 'Choose System',
      VERSION: 'Version',
      RELEASED: 'Released',
      OSX: 'OS X',
      WINDOWS: 'Windows',
      UBUNTU32: 'Ubuntu 32-bit',
      UBUNTU64: 'Ubuntu 64-bit',
      UNKNOWNOS: '(unknown operating system)',
      OTHER_SYSTEMS: 'Other systems',
      DOWNLOAD_IN_PROGRESS: 'Your download should be in progress...',
      DIRECT_LINK: 'Direct download link',
      WARNING: 'Warning: Lantern is pending external security audit and thorough peer review within the technical community. Please only use Lantern if you understand your risks.',
      FORUMS: 'Forums',
      DOCS: 'Docs',
      DEVELOPERS: 'Developers',
      COPYRIGHT: '© 2013 Brave New Software',
    });

    $translateProvider.preferredLanguage('en_EN');
  }
]);
