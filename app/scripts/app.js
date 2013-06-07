'use strict';

angular.module('GetLanternSiteApp', [
    'pascalprecht.translate',
    'angular-google-analytics'
  ],
  ['$translateProvider', function ($translateProvider) {
    $translateProvider.translations('en_EN', {
      LANTERN: 'Lantern',
      BETA: 'Beta',
      FREE_THE_INTERNET: 'Free the Internet',
      SECURELY_SHARE: 'Securely share your connection to defeat censorship',
      CHECK_BACK_SOON: 'Check back again soon to download Lantern.',
      DOWNLOAD_LANTERN: 'Download Lantern',
      CHOOSE_SYSTEM: 'Choose System',
      VERSION: 'Version',
      OR_HIGHER: 'or higher',
      RELEASED: 'Released',
      OSX: 'OS X 64-bit',
      WINDOWS: 'Windows',
      UBUNTU32: 'Ubuntu 32-bit',
      UBUNTU64: 'Ubuntu 64-bit',
      UNAVAILABLE_OS: '(unavailable operating system)',
      OTHER_SYSTEMS: 'Other systems',
      DOWNLOAD_IN_PROGRESS: 'Thank you for downloading Lantern.',
      DIRECT_LINK: 'If your download has not started automatically, click here.',
      WARNING: 'Warning: Lantern is pending external security audit and thorough peer review within the technical community. Please only use Lantern if you understand your risks.',
      FORUMS: 'Forums',
      DOCS: 'Docs',
      DEVELOPERS: 'Developers',
      COPYRIGHT: '© 2013 Brave New Software',
    });
    $translateProvider.preferredLanguage('en_EN');
  }])
  .config(['AnalyticsProvider', 'constants', function (AnalyticsProvider, constants) {
    AnalyticsProvider.setAccount(constants.GA_ACCOUNT_ID);
  }]);
