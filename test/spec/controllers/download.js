'use strict';

describe('Controller: DownloadCtrl', function () {

  // load the controller's module
  beforeEach(module('GetLanternSiteApp'));

  var DownloadCtrl,
    scope,
    $httpBackend,
    mockInstallerData = {"OSX":{},"WINDOWS":{},"UBUNTU32":{},"UBUNTU64":{}};

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope, $injector) {
    scope = $rootScope.$new();
    DownloadCtrl = $controller('DownloadCtrl', {
      $scope: scope
    });
    $httpBackend = $injector.get('$httpBackend');
    $httpBackend.whenGET(/.*/).respond(mockInstallerData);
  }));

  afterEach(function() {
    $httpBackend.verifyNoOutstandingExpectation();
    $httpBackend.verifyNoOutstandingRequest();
  });

  it('initially has no installer data', function () {
    expect(scope.data).toBeUndefined();
  });

  it('should try to fetch the latest installer metadata', function () {
    $httpBackend.expectGET(/.*/);
    DownloadCtrl.fetchInstallerMetadata(function () {
      expect(scope.data).toBeDefined();
      expect(scope.data.OSX).toBeDefined();
      expect(scope.data.WINDOWS).toBeDefined();
      expect(scope.data.UBUNTU64).toBeDefined();
      expect(scope.data.UBUNTU32).toBeDefined();
    });
    $httpBackend.flush();
  });
});
