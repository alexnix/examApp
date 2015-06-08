'use strict';

angular.module('quizPortalApp')
  .directive('quizCard', function () {
    return {
      templateUrl: 'app/directives/quiz-card/quiz-card.html',
      restrict: 'EA',
      link: function (scope, element, attrs) {
  	    scope.substr = function(str){
	    	return str.substr(0, 25) + "[..]";
	    };
      }
    };
  });