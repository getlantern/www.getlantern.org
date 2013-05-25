'use strict';

angular.module('GetLanternSiteApp')
  .controller('DownloadCtrl', function ($scope, osSniffer, installerDataFetcher) {
    $scope.selectedOS = osSniffer.os;
    $scope.downloadClicked = false;

    installerDataFetcher.fetch().then(function (data) {
      $scope.data = data;
    });

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
