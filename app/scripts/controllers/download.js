'use strict';

angular.module('lantern_www')
  .controller('DownloadCtrl', [
      '$log',
      '$rootScope',
      '$scope',
      '$window',
      '$timeout',
      'constants',
      'installerDataFetcher',
      'osSniffer',
      function ($log, $rootScope, $scope, $window, $timeout, constants, installerDataFetcher, osSniffer) {
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
      //Analytics.trackEvent('download', 'clicked', osSniffer.os);
    };

    $scope.trackEvent = function(type) {
        $window.ga('send', 'event', type, 
                   'click', type + ' ' + osSniffer.os);
    };

    $scope.selectOS = function (os) {
      $scope.downloadClicked = false;
      $scope.selectedOS = os;
      //Analytics.trackEvent('selectOS', 'clicked', os);
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

    $scope.order = ['Mac OS X', 'Windows', 'Linux'];
    $scope.oss = {
        'Mac OS X' : constants.OSX_URL,
        'Windows' : constants.WIN_URL,
        'Linux': constants.DEB_URL64
    };

    $scope.init = function () {
        if ($scope.selectedOS == "OSX") {
            $scope.order = ['Mac OS X', 'Windows', 'Linux'];
        }
        else if ($scope.selectedOS == "WINDOWS") {
            $scope.order = ['Windows', 'Mac OS X', 'Linux'];
        }
        else if ($scope.selectedOS == "UBUNTU64" || 
            $scope.selectedOS == "UBUNTU32") {
            $scope.order = ['Linux', 'Mac OS X', 'Windows'];
            if ($scope.selectedOS == "UBUNTU32") {
                $scope.oss['Linux'] = constants.DEB_URL32;
            }
        }
    };

    $scope.faqs = [ {
            key : "SAFE_TO_USE",
            nparagraphs : 3
          }, {
            key : "PRIVACY_INFO",
            nparagraphs : 2
          }, {
            key : "CANT_REACH_USERS",
            nparagraphs : 2
          }, {
            key : "COMPARE_TO_OTHER_TOOLS",
            nparagraphs : 4
          }, {
            key : "PROXY_BY_DEFAULT",
            nparagraphs : 2
          }, {
            key : "TRUST_NETWORK",
            nparagraphs : 3
//          }, {
//            key : "RESISTANT_TO_BLOCKING",
//            nparagraphs : 1
          }, {
            key : "DOWNLOAD_LANTERN",
            nparagraphs : 1
          }, {
            key : "CAN_I_STILL_HELP",
            nparagraphs : 1
          }, {
            key : "INSTALLED_LANTERN",
            nparagraphs : 4
          }, {
            key : "VULNERABLE_TO_HACKERS",
            nparagraphs : 1
          }, {
            key : "IS_LANTERN_FREE",
            nparagraphs : 2
          }, {
            key : "CONTRIBUTE",
            nparagraphs : 1
          }, {
            key : "MORE_QUESTIONS",
            nparagraphs : 1
          }
          ];

    /**
     * Generates a range of numbers from start to end (inclusive)
     */
    $scope.range = function(start, end) {
      var result = [];
      for (var i=start; i<=end; i++) {
        result.push(i);
      }
      return result;
    }
  }]);
