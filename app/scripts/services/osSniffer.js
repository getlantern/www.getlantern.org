'use strict';

angular.module('GetLanternSiteApp')
  .factory('osSniffer', function (Analytics) {
    var os = 'UNAVAILABLE_OS';

    // requires https://github.com/codejoust/session.js
    if (window.session) {
      switch (window.session.browser.os) {
      case 'Mac':
        os = 'OSX';
        break;
      case 'Windows':
        os = 'WINDOWS';
        break;
      case 'Linux':
        // https://github.com/codejoust/session.js/issues/29
        // https://github.com/codejoust/session.js/issues/30
        if (/Ubuntu/.test(navigator.userAgent)) {
          if (/x86_64/.test(navigator.userAgent)) {
            os = 'UBUNTU64';
          } else if (/(x|i6)86/.test(navigator.userAgent)) {
            os = 'UBUNTU32';
          }
        }
        break;
      }
    }

    Analytics.trackEvent('osSniffer', os, navigator.userAgent, null, true);

    return {
      os: os
    };
  });
