'use strict';

describe('Directive: materialImage', function () {

  // load the directive's module
  beforeEach(module('quizPortalApp'));

  var element,
    scope;

  beforeEach(inject(function ($rootScope) {
    scope = $rootScope.$new();
  }));

  it('should make hidden element visible', inject(function ($compile) {
    element = angular.element('<material-image></material-image>');
    element = $compile(element)(scope);
    expect(element.text()).toBe('this is the materialImage directive');
  }));
});