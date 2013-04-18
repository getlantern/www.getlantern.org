'use strict';

describe('Controller: MainCtrl', function () {

  // load the controller's module
  beforeEach(module('www.getlantern.orgApp'));

  var MainCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    MainCtrl = $controller('MainCtrl', {
      $scope: scope
    });
  }));

  it('should attach a variable foo with value "bar" to the scope', function () {
    expect(scope.foo).toEqual("bar");
  });
});
