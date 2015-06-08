'use strict';

angular.module('quizPortalApp')
  .directive('arrayDisplay', function () {
    return {
			scope: {
			  array: '=',
			  editable: '=',
			},
      templateUrl: 'app/directives/arrayDisplay/arrayDisplay.html',
      restrict: 'E',
      link: function (scope, element, attrs) {
      	scope.removeTag = function(index){
      		scope.array.splice(index, 1);
      	}
      }
    };
  });