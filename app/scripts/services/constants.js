'use strict';

angular.module('GetLanternSiteApp')
  .factory('constants', function () {
    return {
      FORUMS_URL: 'https://groups.google.com/group/lantern-users-en',
      DOCS_URL: 'https://github.com/getlantern/lantern/wiki',
      DEVELOPERS_URL: 'https://github.com/getlantern/lantern',

    // point this at the real data when it's ready, or point at a not found url
    // to test what happens if we can't reach the installer data or if we take
    // it down on purpose to temporarily disable public download:
    //INSTALLER_DATA_URL: '//s3.amazonaws.com/lantern-installers/latest.json'
      INSTALLER_DATA_URL: '//s3.amazonaws.com/lantern-installers/dummy-latest.json'
    // local version handy for avoiding cross-origin requests in testing
    //INSTALLER_DATA_URL: '/data/dummy-latest.json'
    };
  });
