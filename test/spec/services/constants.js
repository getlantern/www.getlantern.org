'use strict';

describe('Service: constants', function () {

  beforeEach(module('GetLanternSiteApp'));

  var constants,
      URL_PAT = /^http(s):\/\/.*$/; // naive but good enough

  beforeEach(inject(function (_constants_) {
    constants = _constants_;
  }));

  it('should define necessary constants', function () {
    expect(constants.INSTALLER_DATA_URL).toMatch(URL_PAT);
  });

});
