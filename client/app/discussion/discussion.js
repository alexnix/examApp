'use strict';

angular.module('quizPortalApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('discussion', {
        url: '/discussion',
        templateUrl: 'app/discussion/discussion.html',
        controller: 'DiscussionCtrl',
        data: {
        	isPrivate: false,
        }
      });
  });