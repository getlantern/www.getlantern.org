'use strict';

angular.module('GetLanternSiteApp')
  .controller('DownloadCtrl', function ($scope, $http, $log, constants, osSniffer) {
    $scope.selectedOS = osSniffer.os;

    $scope.selectOS = function (os) {
      $scope.selectedOS = os;
    };

    $scope.icnClassFor = {
      OSX: 'apple',
      WINDOWS: 'windows',
      UBUNTU32: 'ubuntu',
      UBUNTU64: 'ubuntu'
    };

    function isValid(data) {
      if (!angular.isObject(data) || angular.isArray(data)) {
        return false;
      }
      for (var key in data) {
        var installer = data[key];
        if (!angular.isObject(installer) || angular.isArray(installer) ||
            !installer.url || !installer.version) {
          return false;
        }
      }
      return true;
    }

    this.fetchInstallerMetadata = function(callback) {
      $http.get(constants.INSTALLER_METADATA_URL)
        .success(function (data/*, status, headers, config*/) {
          if (isValid(data)) {
            $scope.data = data;
            if (callback) {
              callback();
            }
          } else {
            $log.error('installer metadata invalid:', data);
          }
        });
    };

    $scope.fetchInstallerMetadata = this.fetchInstallerMetadata;
  });
