'use strict';

angular.module('GetLanternSiteApp')
  .controller('DownloadCtrl', function ($rootScope, $scope, $log, $timeout, osSniffer, installerDataFetcher) {
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
    $timeout(fetch);

    $scope.handleDownload = function () {
      $scope.downloadClicked = true;
      if (!/nodownload/.test(window.location.search)) {
        window.location.href = $scope.data[$scope.selectedOS].url;
      }
    };

    $scope.selectOS = function (os) {
      $scope.downloadClicked = false;
      $scope.selectedOS = os;
    };

    $scope.icnClassFor = {
      OSX: 'apple',
      WINDOWS: 'windows',
      UBUNTU32: 'ubuntu',
      UBUNTU64: 'ubuntu'
    };
  });
