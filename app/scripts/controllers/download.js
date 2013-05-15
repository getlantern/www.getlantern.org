'use strict';

angular.module('GetLanternSiteApp')
  .controller('DownloadCtrl', function ($scope, $http, constants, osSniffer) {
    $scope.selectedOS = osSniffer.os;

    $scope.selectOS = function (os) {
      $scope.selectedOS = os;
    };

    this.fetchInstallerMetadata = function(callback) {
      $http.get(constants.INSTALLER_METADATA_URL)
        .success(function (data/*, status, headers, config*/) {
          $scope.data = data;
          if (callback) {
            callback();
          }
        })
        .error(function (/*data, status, headers, config*/) {
          $scope.errorLoading = true;
        });
    };

    $scope.fetchInstallerMetadata = this.fetchInstallerMetadata;
  });
