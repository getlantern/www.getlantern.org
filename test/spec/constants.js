'use strict';

describe('constants', function () {

  beforeEach(module('GetLanternSiteApp'));

  var constants,
      URL_PAT = /^(http:|https:|)\/\/.*$/; // naive but good enough

  beforeEach(inject(function (_constants_) {
    constants = _constants_;
  }));

  it('should define necessary constants', function () {
    var urlKeys = 'FORUMS_URL DOCS_URL DEVELOPERS_URL INSTALLER_DATA_URL'.split(' ');
    urlKeys.forEach(function(key) {
      expect(constants[key]).toMatch(URL_PAT);
    });
  });

});
