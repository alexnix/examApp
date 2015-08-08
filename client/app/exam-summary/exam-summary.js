'use strict';

angular.module('quizPortalApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('exam-summary', {
        url: '/summary/:user/:exam',
        templateUrl: 'app/exam-summary/exam-summary.html',
        controller: 'ExamSummaryCtrl',
        data: {
        	isPrivate: false,
        },
        params: {
        	fromProfile: false,
        }
      });
  });