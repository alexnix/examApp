'use strict';

describe('Service: Confirm', function () {

  // load the service's module
  beforeEach(module('quizPortalApp'));

  // instantiate service
  var Confirm;
  beforeEach(inject(function (_Confirm_) {
    Confirm = _Confirm_;
  }));

  it('should do something', function () {
    expect(!!Confirm).toBe(true);
  });

});
