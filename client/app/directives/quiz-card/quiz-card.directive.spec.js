'use strict';

describe('Directive: quizCard', function () {

  // load the directive's module and view
  beforeEach(module('quizPortalApp'));
  beforeEach(module('app/directives/quiz-card/quiz-card.html'));

  var element, scope;

  beforeEach(inject(function ($rootScope) {
    scope = $rootScope.$new();
  }));

  it('should make hidden element visible', inject(function ($compile) {
    element = angular.element('<quiz-card></quiz-card>');
    element = $compile(element)(scope);
    scope.$apply();
    expect(element.text()).toBe('this is the quizCard directive');
  }));
});