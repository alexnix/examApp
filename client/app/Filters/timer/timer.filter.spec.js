'use strict';

describe('Filter: timer', function () {

  // load the filter's module
  beforeEach(module('quizPortalApp'));

  // initialize a new instance of the filter before each test
  var timer;
  beforeEach(inject(function ($filter) {
    timer = $filter('timer');
  }));

  it('should return the input prefixed with "timer filter:"', function () {
    var text = 'angularjs';
    expect(timer(text)).toBe('timer filter: ' + text);
  });

});
