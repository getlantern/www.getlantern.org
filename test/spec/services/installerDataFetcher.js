'use strict';

describe('Service: installerDataFetcher', function () {

  beforeEach(module('GetLanternSiteApp'));

  var installerDataFetcher,
    constants,
    $$httpBackend,
    mockDataValid = {OSX: {url: 'http://path/to/dmg', version: 'x.y.z'}},
    mockDataInvalid = {valid: false};

  beforeEach(inject(function (_installerDataFetcher_, _constants_, $httpBackend) {
    installerDataFetcher = _installerDataFetcher_;
    constants = _constants_;
    $$httpBackend = $httpBackend;
  }));

  afterEach(function() {
    $$httpBackend.verifyNoOutstandingExpectation();
    $$httpBackend.verifyNoOutstandingRequest();
  });

  xdescribe('fetch', function () {
    it('should make an http request for the installer data and return a '+
       'promise that is resolved if valid data is received', function () {
      $$httpBackend.whenGET(constants.INSTALLER_DATA_URL).respond(mockDataValid);
      $$httpBackend.expectGET(constants.INSTALLER_DATA_URL);
      installerDataFetcher.fetch().then(function (data) {
        expect(data).toBe(mockDataValid);
      });
      $$httpBackend.flush();
    });

    it('should make an http request for the installer data and return a '+
       'promise that is rejected if invalid data is received', function () {
      var spy = jasmine.createSpyObj('spy', ['onsuccess', 'onerror']);
      $$httpBackend.whenGET(constants.INSTALLER_DATA_URL).respond(mockDataInvalid);
      $$httpBackend.expectGET(constants.INSTALLER_DATA_URL);
      installerDataFetcher.fetch().then(spy.onsuccess, spy.onerror);
      $$httpBackend.flush();
      expect(spy.onsuccess).not.toHaveBeenCalled();
      expect(spy.onerror).toHaveBeenCalled();
    });
  });
});
