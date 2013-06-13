'use strict';

angular.module('GetLanternSiteApp', [
    'pascalprecht.translate',
    'angular-google-analytics'
  ],
  ['$translateProvider', function ($translateProvider) {
    $translateProvider.useStaticFilesLoader({
      prefix: 'locale/',
      suffix: '.json'
    });
    $translateProvider.uses('en_US');
  }])
  .config(['AnalyticsProvider', 'constants', function (AnalyticsProvider, constants) {
    AnalyticsProvider.setAccount(constants.GA_ACCOUNT_ID);
  }]);
