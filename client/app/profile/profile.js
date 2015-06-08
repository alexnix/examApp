'use strict';

angular.module('quizPortalApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('profile', {
        url: '/me',
        templateUrl: 'app/profile/profile.html',
        controller: 'ProfileCtrl',
        data: {
        	isPrivate: true,
        }
      });
  });