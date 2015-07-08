'use strict';

angular.module('quizPortalApp')
  .service('Exam', function ($http) {
    return {
    	QuizNormal: function(){
    		return $http.post('http://quizapp213.appspot.com/allCards');
    	},

    	
    };
  });
