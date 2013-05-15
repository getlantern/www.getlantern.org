'use strict';

describe('Service: constants', function () {

  // load the service's module
  beforeEach(module('GetLanternSiteApp'));

  // instantiate service
  var constants;
  beforeEach(inject(function (_constants_) {
    constants = _constants_;
  }));

  it('should define necessary constants', function () {
    expect(!!constants).toBe(true);
    expect(constants.INSTALLER_METADATA_URL).toBeDefined();
  });

});
