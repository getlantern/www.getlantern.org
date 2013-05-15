'use strict';

angular.module('GetLanternSiteApp')
  .controller('FooterCtrl', ['$scope', function ($scope) {
    $scope.navLinks = {
      LINKTEXT_FORUMS: 'https://groups.google.com/group/lantern-users-en',
      LINKTEXT_DOCS: 'https://github.com/getlantern/lantern/wiki',
      LINKTEXT_DEVELOPERS: 'https://github.com/getlantern/lantern'
    };
  }]);
