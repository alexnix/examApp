'use strict';

angular.module('quizPortalApp')
  .filter('time', function () {

  	function pad(n) {
		return (n < 10) ? ("0" + n) : n;
	}

    return function (input) {

      	var hours = Math.floor (input / 3600);
    	var minutes  = Math.floor ((input - hours*3600) / 60);
    	var seconds = input - hours * 3600 - minutes * 60;
    	var output = '';
    	if ( hours > 0 )
    		output += pad(hours) + "h";
    	if( minutes > 0 ) 
    		output += pad(minutes) + "m";
    	if( seconds > 0 )
    		output += pad(seconds) + "s"
    	return output || "No Limit";
    };
  });
