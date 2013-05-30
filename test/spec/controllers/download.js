'use strict';

describe('Controller: DownloadCtrl', function () {

  beforeEach(module('GetLanternSiteApp'));

  var DownloadCtrl,
    scope,
    calledFetch,
    deferred,
    timeout,

    // XXX move mocks into separate files
    mockOsSniffer = {os: 'dummyOS'},
    mockInstallerDataFetcher = {
      fetch: function() {
        calledFetch = true;
        return deferred.promise;
      }
    };

  beforeEach(inject(function ($rootScope, $controller, $q, $timeout) {
    scope = $rootScope.$new();
    calledFetch = false;
    deferred = $q.defer();
    timeout = $timeout;
    DownloadCtrl = $controller('DownloadCtrl', {
      $scope: scope,
      osSniffer: mockOsSniffer,
      installerDataFetcher: mockInstallerDataFetcher
    });
  }));

  it('should set scope.selectedOS to the value returned by osSniffer on init', function () {
    expect(scope.selectedOS).toEqual(mockOsSniffer.os);
  });

  xit('should call installerDataFetcher.fetch on init', function () {
    expect(calledFetch).toBeTruthy();
  });

  xit('should set scope.data to the value fetch resolves to', function () {
    deferred.resolve('it worked');
    scope.$apply();
    timeout.flush();
    expect(scope.data).toEqual('it worked');
  });
});
