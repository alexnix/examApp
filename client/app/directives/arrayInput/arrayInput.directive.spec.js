'use strict';

describe('Directive: arrayInput', function () {

  // load the directive's module and view
  beforeEach(module('quizPortalApp'));
  beforeEach(module('app/directives/arrayInput/arrayInput.html'));

  var element, scope;

  beforeEach(inject(function ($rootScope) {
    scope = $rootScope.$new();
  }));

  it('should make hidden element visible', inject(function ($compile) {
    element = angular.element('<array-input></array-input>');
    element = $compile(element)(scope);
    scope.$apply();
    expect(element.text()).toBe('this is the arrayInput directive');
  }));
});