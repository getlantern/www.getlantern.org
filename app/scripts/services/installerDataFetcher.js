'use strict';

angular.module('GetLanternSiteApp')
  .factory('installerDataFetcher', function ($log, $http, $q, constants) {

    function fetch() {
      var deferred = $q.defer();
      $http.get(constants.INSTALLER_DATA_URL)
        .success(function (data, status, headers, config) {
          if ($log.debug) { // requires angular 1.1+
            $log.debug('fetch succeeded', data, status, headers, config);
          }
          if (isValid(data)) {
            deferred.resolve(data);
          } else {
            $log.error('data invalid');
            deferred.reject();
          }
        });
      return deferred.promise;
    }

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

    return {
      fetch: fetch
    };
  });
