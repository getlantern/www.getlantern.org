'use strict';

angular.module('GetLanternSiteApp')
  .factory('installerDataFetcher', ['$http', '$q', 'constants', function ($http, $q, constants) {

    function fetch(callback, errback) {
      // work around https://github.com/angular/angular.js/issues/934
      var fetchFunc = window.XDomainRequest ? xdrFetch : xhrFetch;
      return fetchFunc(constants.INSTALLER_DATA_URL,
        function (data) {
          if (isValid(data)) {
            callback(data);
          } else {
            errback();
          }
        },
        errback);
    }

    function xhrFetch(url, callback, errback) {
      return $http.get(url)
        .success(function (data) {
          callback(data);
        })
        .error(errback);
    }

    function xdrFetch(url, callback, errback) {
      var xdr = new window.XDomainRequest();
      xdr.onload = function () {
        var data;
        try {
          data = JSON.parse(xdr.responseText);
        } catch (e) {
          errback('JSON parse error: '+e);
        }
        if (data) {
          callback(data);
        }
      };
      xdr.onerror = function () {
        errback('xdr error');
      };
      xdr.ontimeout = function () {
        errback('xdr timeout');
      };
      // xdr is aborted if not all handlers are defined
      xdr.onprogress = angular.noop;
      xdr.timeout = 3000;
      xdr.open('GET', url);
      xdr.send(null);
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
  }]);
