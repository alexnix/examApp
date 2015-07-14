'use strict';

angular.module('quizPortalApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('dashboard', {
        url: '/dashboard',
        templateUrl: 'app/profile/profile.html',
        controller: 'ProfileCtrl',
        data: {
        	isPrivate: true,
        }
      });
  });