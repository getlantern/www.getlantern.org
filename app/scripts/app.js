'use strict';

angular.module('GetLanternSiteApp', [
    'pascalprecht.translate',
    'angular-google-analytics'
  ],
  ['$translateProvider', 'constants', function ($translateProvider, constants) {
    $translateProvider.useStaticFilesLoader({
      prefix: 'locale/',
      suffix: '.json'
    });
    $translateProvider.uses(constants.DEFAULT_LOCALE);
  }])
  .config(['AnalyticsProvider', 'constants', function (AnalyticsProvider, constants) {
    AnalyticsProvider.setAccount(constants.GA_ACCOUNT_ID);
  }]);
