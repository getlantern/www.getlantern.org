'use strict';

angular.module('GetLanternSiteApp')
  .factory('constants', function () {
    return {
    // point this at the real data when it's ready, or point at a not found url
    // to test what happens if we can't reach the installer data or if we take
    // it down on purpose to temporarily disable public download:
    //INSTALLER_METADATA_URL: 'https://s3.amazonaws.com/lantern-installers/latest.json'
      INSTALLER_METADATA_URL: 'https://s3.amazonaws.com/lantern-installers/dummy-latest.json'
    };
  });
