'use strict';

angular.module('quizPortalApp')
  .directive('quizCard', function ($rootScope) {
    return {
      templateUrl: 'app/directives/quiz-card/quiz-card.html',
      restrict: 'EA',
      link: function (scope, element, attrs) {
  	    scope.substr = function(str){
  	    	return str.substr(0, 25) + "[..]";
  	    };

        scope.youAttepted = function(test_id){
          if (  $rootScope.User ){
            var score = null;
            $rootScope.User.exams.forEach(function(exam){
              if( exam._id == test_id )
                score = exam.score;
            });
            return score;
          } else {
            return null;
          }
        };

        scope.shareGooglePlus = function(id) {
          var shareUrl = location.protocol + '//' + location.host + "/exam/" + id;
          popit('https://plus.google.com/share?url='+shareUrl);
        };

        scope.shareFacebook = function(id) {
          var shareUrl = location.protocol + '//' + location.host + "/exam/" + id;
          popit('https://www.facebook.com/sharer/sharer.php?u='+shareUrl);
        };

        scope.shareLinkedIn = function(id) {
          var shareUrl = location.protocol + '//' + location.host + "/exam/" + id;
          popit('https://www.linkedin.com/shareArticle?mini=true&url='+shareUrl);
        };

        function popit(url) {
          var newwindow=window.open(url,'name','height=500,width=500');
          if (window.focus) {newwindow.focus()}
          return false;
        };

      }
    };
  });