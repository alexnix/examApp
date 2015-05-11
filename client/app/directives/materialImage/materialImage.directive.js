'use strict';

angular.module('quizPortalApp')
  .directive('materialImage', ['$compile', function ($compile) {
    return {
      template: "<img class='materialboxed' src='http://i.stack.imgur.com/88cpr.jpg'/>",
      restrict: 'EA',
      
      link: function (scope, element, attrs) {
	    $('.materialboxed').materialbox();
      }
    };
  }]);