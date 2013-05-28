'use strict';

angular.module('GetLanternSiteApp')
  .factory('installerDataFetcher', function ($log, $http, $q, constants) {

    function xhrFetch(url) {
      var deferred = $q.defer();
      $http.get(url)
        .success(function (data) {
          deferred.resolve(data);
        })
        .error(function () {
          $log.error('fetch failed');
          deferred.reject();
        });
      return deferred.promise;
    }

    function xdrFetch(url) {
      var deferred = $q.defer(),
          xdr = new window.XDomainRequest();
      xdr.onload = function () {
        deferred.resolve(xdr.responseText);
      };
      xdr.onerror = function () {
        deferred.reject();
      };
      xdr.open('GET', url);
      xdr.send();
      return deferred.promise;
    }

    function fetch() {
      var deferred = $q.defer(),
          // work around https://github.com/angular/angular.js/issues/934
          fetchFunc = window.XDomainRequest ? xdrFetch : xhrFetch;
      fetchFunc(constants.INSTALLER_DATA_URL)
        .then(function (data) {
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
