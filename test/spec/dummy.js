'use strict';

describe('Dummy test', function () {

  // load the controller's module
  beforeEach(module('GetLanternSiteApp'));

  /*
  var DownloadCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $httpBackend, $rootScope) {
    scope = $rootScope.$new();
    $httpBackend.expectGET('/locale/en_US.json');
    DownloadCtrl = $controller('DownloadCtrl', {
      $scope: scope
    });
    $httpBackend.flush();
  }));
  */

  it('(dummy test) 1 + 1 == 2', function () {
    expect(1 + 1).toEqual(2);
  });
});
