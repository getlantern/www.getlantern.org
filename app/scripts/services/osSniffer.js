'use strict';

angular.module('GetLanternSiteApp')
  .factory('osSniffer', function () {
    var os = 'UNKNOWNOS';

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
        // XXX TODO make this more robust
        // https://github.com/codejoust/session.js/issues/29
        // https://github.com/codejoust/session.js/issues/30
        if (/x86_64/.test(navigator.userAgent)) {
          os = 'UBUNTU64';
        } else if (/x86/.test(navigator.userAgent)) {
          os = 'UBUNTU32';
        }
        break;
      }
    }

    return {
      os: os
    };
  });
