'use strict';

angular.module('quizPortalApp')
  .filter('timer', function () {
  	function pad(n) {
		return (n < 10) ? ("0" + n) : n;
	}
    return function (input) {

    	var hours = Math.floor (input / 3600);
    	var minutes  = Math.floor ((input - hours*3600) / 60);
    	var seconds = input - hours * 3600 - minutes * 60;
    	return pad(hours) + ":" + pad(minutes) + ":" + pad(seconds);

    };
  });
