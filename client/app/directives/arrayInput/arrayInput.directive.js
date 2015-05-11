'use strict';

angular.module('quizPortalApp')
  .directive('arrayInput', function () {
    return {
        scope: {
            tags: '=',
            placeholder: '@',
        },
        restrict: 'E',
        templateUrl: 'app/directives/arrayInput/arrayInput.html',
        link: function(scope, element, attrs) {
            // if( scope.tags == null ){
            //     var form = $(element).parents('form');
            //     scope[form.prop('name')].$setValidity('validation', false);
            // }
            scope.removeTag = function(index){
                scope.tags.splice( index, 1 );
            };
            scope.addTag = function(event) {
                if( scope.tags === undefined || scope.tags === null ){
                    scope.tags = [];
                    // if( form )
                    //     scope[form.prop('name')].$setValidity('validation', true);
                }
                
                if( event.keyCode==13 && scope.newTag ){
                    scope.tags.push( scope.newTag );
                    scope.newTag = null;
                }
            };
        },
    };
  });