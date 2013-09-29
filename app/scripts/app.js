'use strict';

angular.module('GetLanternSiteApp', [
    'ngCookies',
    'pascalprecht.translate',
    'ui.bootstrap',
    'angular-google-analytics'
  ],
  ['$translateProvider', 'constants', function ($translateProvider, constants) {
    if (!window.translations) {
      throw new Error('Expected "window.translations" to be populated. Was "grunt jsFromJSON" not run?');
      return;
    }
    angular.forEach(window.translations, function (transTable, langCode) {
      $translateProvider.translations(langCode, transTable);
    });
    $translateProvider.useCookieStorage();
    $translateProvider.preferredLanguage(constants.DEFAULT_LANGCODE);//XXX set this via locale negotiation with session.js
    $translateProvider.fallbackLanguage(constants.DEFAULT_LANGCODE);
  }])
  .run(['$cookies', '$rootScope', '$translate', 'constants', function ($cookies, $rootScope, $translate, constants) {
    $rootScope.constants = constants;
    $rootScope.activeLang = constants.LANGS[$translate.uses()];

    $rootScope.changeLang = function (langCode) {
      $rootScope.activeLang = constants.LANGS[langCode];
      $translate.uses(langCode);
    };
  }])
  .config(['AnalyticsProvider', 'constants', function (AnalyticsProvider, constants) {
    AnalyticsProvider.setAccount(constants.GA_ACCOUNT_ID);
  }]);
