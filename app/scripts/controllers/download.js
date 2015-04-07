'use strict';

angular.module('lantern_www')
  .controller('DownloadCtrl', [
      '$log',
      '$rootScope',
      '$scope',
      '$window',
      '$timeout',
      '$translate',
      '$sce',
      'constants',
      'installerDataFetcher',
      'osSniffer',
      function ($log, $rootScope, $scope, $window, $timeout, $translate, 
                $sce, constants, installerDataFetcher, osSniffer) {
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
      return false;
    };

    $scope.hideBetaLink = false; 

    if ($translate.use() == constants.LANGS.fa_IR.code) {
        $scope.hideBetaLink = true;
    };

    $scope.trackEvent = function(type) {
        $window.ga('send', 'event', type, 
                   'click', osSniffer.os);
        if (type === 'download' && $translate.use() == constants.LANGS.fa_IR.code) {
            $scope.conversionTrackingUrl = $sce.trustAsResourceUrl('//insight.adsrvr.org/tags/l2p03i8/ddylndam/iframe');
            $scope.trackFBConversion();
        }
    };

    $scope.trackFBConversion = function() {
      (function() {
        var _fbq = window._fbq || (window._fbq = []);
        if (!_fbq.loaded) {
          var fbds = document.createElement('script');
          fbds.async = true;
          fbds.src = '//connect.facebook.net/en_US/fbds.js';
          var s = document.getElementsByTagName('script')[0];
          s.parentNode.insertBefore(fbds, s);
          _fbq.loaded = true;
        }
      })();
      window._fbq = window._fbq || [];
      window._fbq.push(['track', '6022956323756', {'value':'0.00','currency':'USD'}]);
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
    $rootScope.DEB_URL = constants.DEB_URL64;

    if ($translate.use() == constants.LANGS.fa_IR.code) {
        $scope.OSX_URL = constants.OSX_BETA_URL;
        $scope.WIN_URL = constants.WIN_BETA_URL;
        $rootScope.DEB_URL = $scope.DEB_URL64 = constants.DEB_BETA_URL64;
        $scope.DEB_URL32 = constants.DEB_BETA_URL32;
        $scope.oss = {
            'Mac OS X' : constants.OSX_BETA_URL,
            'Windows' : constants.WIN_BETA_URL,
            'Linux': constants.DEB_BETA_URL64
        };
        $scope.version = '2.0.0 Beta 3';
    } else {
        $scope.oss = {
            'Mac OS X' : constants.OSX_URL ,
            'Windows' : constants.WIN_URL,
            'Linux': constants.DEB_URL64
        };
        $scope.version = '1.5.17';
    }
    //$('span.os').prepend($scope.version == 'beta' ? '2.0.0 Beta 3' : '1.5.17');
    /*function versionCallback(versions) {
        $('span.os').prepend($scope.version == 'beta' ? '2.0.0 Beta 3' : '1.5.17');
    };
    $.getScript("https://s3.amazonaws.com/lantern/version.js");*/

    $scope.macsteps = [
        "Open the .dmg file and double-click the 'Lantern Installer' icon",
    ];

    $(window).resize(function(){

        if (window.innerWidth < 600) {
            var gif = angular.element(document.querySelector('#gif-map'))[0];
            gif.style.display = "block";
        }
    });

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
                $rootScope.DEB_URL = constants.DEB_URL32;
            }
        }

        var map = angular.element( document.querySelector( '#map' ) )[0];
        if (window.screen.width > 600) {
            map.attributes.src.value = "https://ui.getlantern.org/app/index.html";
        } else {
            var gif = angular.element(document.querySelector('#gif-map'))[0];
            gif.style.display = "block";
        }
    };

    $scope.faqs = [ {
            key : "WHO_ARE_WE",
            nparagraphs : 1
          }, {
            key : "IS_LANTERN_FREE",
            nparagraphs : 2
          }, {
            key : "SAFE_TO_USE",
            nparagraphs : 6
          }, {
            key : "SAFE_TO_PROVIDE_ACCESS",
            nparagraphs : 1
          }, {
            key : "PRIVACY_INFO",
            nparagraphs : 1
          }, {
            key : "CANT_REACH_USERS",
            nparagraphs : 1
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
