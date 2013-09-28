'use strict';

angular.module('GetLanternSiteApp', [
    'pascalprecht.translate',
    'angular-google-analytics'
  ],
  function ($translateProvider, constants) {
    if (!window.translations) {
      throw new Error('Expected "window.translations" to be populated. Was "grunt jsFromJSON" not run?');
      return;
    }
    $translateProvider.translations(window.translations[constants.DEFAULT_LOCALE]);
  })
  .config(function (AnalyticsProvider, constants) {
    AnalyticsProvider.setAccount(constants.GA_ACCOUNT_ID);
  });
