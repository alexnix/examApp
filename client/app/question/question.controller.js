'use strict';

angular.module('quizPortalApp')
  .controller('QuestionCtrl', function ($scope, $http, $stateParams) {
    $scope.page_title = "Question Discussion";

    $scope.url = window.location.href;
    $scope.indetificator = $stateParams.id_question;

    $http.get('/api/exam/getQuestion/' + $stateParams.id_quiz + '/' + $stateParams.id_question).then(function(res){
    	$scope.question = res.data;
    });

  });
