'use strict';

angular.module('quizPortalApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('all', {
        url: '/all',
        templateUrl: 'app/all/all.html',
        controller: 'AllCtrl',
        data: {
        	isPrivate: false,
        },
        params: {
        	category: null,
        }
      });
  });