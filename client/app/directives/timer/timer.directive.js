'use strict';

angular.module('quizPortalApp')
  .directive('timer', ['$interval', function ($interval) {
    return {
      template: '{{time}}',
      restrict: 'EA',
      scope: {
      	seconds: '=',
      },
      link: function (scope, element, attrs) {
      	scope.seconds = scope.seconds / 1000;
      	
      	function pad(n) {
			return (n < 10) ? ("0" + n) : n;
		}

        var tick = $interval(function(){
        	
        	var hours = Math.floor (scope.seconds / 3600);
        	var minutes  = Math.floor ((scope.seconds - hours*3600) / 60);
        	var seconds = scope.seconds - hours * 3600 - minutes * 60;
        	scope.time = pad(hours) + ":" + pad(minutes) + ":" + pad(seconds);

        	scope.seconds --;
        	if(scope.seconds == -1)
        		$interval.cancel(tick);
        }, 1000);
      }
    };
  }]);