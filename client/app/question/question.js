'use strict';

angular.module('quizPortalApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('question', {
        url: '/question/:id_quiz/:id_question',
        templateUrl: 'app/question/question.html',
        controller: 'QuestionCtrl',
        data: {
        	isPrivate: true,
        }
      });
  });