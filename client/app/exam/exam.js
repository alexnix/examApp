'use strict';

angular.module('quizPortalApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('exam', {
        url: '/exam/:id',
        templateUrl: 'app/exam/exam.html',
        controller: 'ExamCtrl',
        data: {
        	isPrivate: true,
        },
      });
  });