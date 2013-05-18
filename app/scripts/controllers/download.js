'use strict';

angular.module('GetLanternSiteApp')
  .controller('DownloadCtrl', function ($scope, osSniffer, installerDataFetcher) {
    $scope.selectedOS = osSniffer.os;

    installerDataFetcher.fetch().then(function (data) {
      $scope.data = data;
    });

    $scope.selectOS = function (os) {
      $scope.selectedOS = os;
    };

    $scope.icnClassFor = {
      OSX: 'apple',
      WINDOWS: 'windows',
      UBUNTU32: 'ubuntu',
      UBUNTU64: 'ubuntu'
    };
  });
