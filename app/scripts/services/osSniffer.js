'use strict';

angular.module('GetLanternSiteApp')
  .factory('osSniffer', function () {
    var os;

    // XXX make this more robust
    if (/OS X/.test(navigator.userAgent)) {
      os = 'OSX';
    } else if (/Windows/.test(navigator.userAgent)) {
      os = 'WINDOWS';
    } else if (/Linux.*x86_64/.test(navigator.userAgent)) {
      os = 'UBUNTU64';
    } else if (/Linux.*x86/.test(navigator.userAgent)) {
      os = 'UBUNTU32';
    } else {
      os = 'UNKNOWNOS';
    }

    return {
      os: os
    };
  });
