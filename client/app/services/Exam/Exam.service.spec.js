'use strict';

describe('Service: Exam', function () {

  // load the service's module
  beforeEach(module('quizPortalApp'));

  // instantiate service
  var Exam;
  beforeEach(inject(function (_Exam_) {
    Exam = _Exam_;
  }));

  it('should do something', function () {
    expect(!!Exam).toBe(true);
  });

});
