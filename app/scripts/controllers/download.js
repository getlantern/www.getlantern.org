'use strict';

angular.module('GetLanternSiteApp')
  .controller('DownloadCtrl', [
      '$log',
      '$rootScope',
      '$scope',
      '$timeout',
      'Analytics',
      'constants',
      'installerDataFetcher',
      'osSniffer',
      function ($log, $rootScope, $scope, $timeout, Analytics, constants, installerDataFetcher, osSniffer) {
    // have to bind to rootScope to work in IE8?
    if (/lt-ie9/.test((document.getElementById('ng-app') || {}).className)) {
      $scope = $rootScope;
    }

    $scope.selectedOS = osSniffer.os;
    $scope.downloadClicked = false;

    var ntries = 0, MAXTRIES = 20;
    function tryAgain() {
      return !$scope.data && ntries++ < MAXTRIES;
    }

    function fetch() {
      installerDataFetcher.fetch(
        function (data) {
          $log.log('successfully fetched installer data', data);
          $scope.data = data;
          $scope.osKeys = Object.keys(data);
          if (!$scope.$$phase) {
            $scope.$digest();
          }
        }, function () {
          $log.error('failed to fetch installer data');
          if (tryAgain()) {
            $timeout(fetch, 3000);
          }
        });
    }

    var onlyShowSignupForm = true;
    if (!onlyShowSignupForm) {
      $timeout(fetch);
    }

    $scope.handleDownload = function () {
      $scope.downloadClicked = true;
      if (/(localhost|127.0.0.1)/.test(location.hostname) ||
          /dummy/.test(constants.INSTALLER_DATA_URL) ||
          /nodownload/.test(location.search)) {
        $log.log('skipping redirect to installer url');
      } else {
        $log.log('redirecting to installer url');
        $timeout(function () {
          location.href = $scope.data[$scope.selectedOS].url;
        }, 500);
      }
      Analytics.trackEvent('download', 'clicked', osSniffer.os);
    };

    $scope.selectOS = function (os) {
      $scope.downloadClicked = false;
      $scope.selectedOS = os;
      Analytics.trackEvent('selectOS', 'clicked', os);
    };

    $scope.icnClassFor = {
      OSX: 'apple',
      WINDOWS: 'windows',
      UBUNTU32: 'ubuntu',
      UBUNTU64: 'ubuntu'
    };

    $scope.isUbuntu = function (key) {
      return (/UBUNTU/).test(key);
    };
  }]);
