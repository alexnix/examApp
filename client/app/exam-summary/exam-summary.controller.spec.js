'use strict';

describe('Controller: ExamSummaryCtrl', function () {

  // load the controller's module
  beforeEach(module('quizPortalApp'));

  var ExamSummaryCtrl, scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    ExamSummaryCtrl = $controller('ExamSummaryCtrl', {
      $scope: scope
    });
  }));

  it('should ...', function () {
    expect(1).toEqual(1);
  });
});
