'use strict';

describe('Service: osSniffer', function () {

  // load the service's module
  beforeEach(module('GetLanternSiteApp'));

  // instantiate service
  var osSniffer;
  beforeEach(inject(function (_osSniffer_) {
    osSniffer = _osSniffer_;
  }));

  it('should set os', function () {
    expect(!!osSniffer.os).toBeDefined();
  });

});
