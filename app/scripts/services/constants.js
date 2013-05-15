'use strict';

angular.module('GetLanternSiteApp')
  .factory('constants', function () {
    return {
      // XXX point this at the real data when it's ready
      INSTALLER_METADATA_URL: 'https://s3.amazonaws.com/lantern-installers/dummy-latest.json'
    };
  });
