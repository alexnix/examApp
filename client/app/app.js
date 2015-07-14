'use strict';

angular.module('quizPortalApp', [
  'ngCookies',
  'ngResource',
  'ngSanitize',
  'ui.router',
  'ui.bootstrap',
  'angular-md5',
  'ui.knob',
  'ngDialog',
  'autocomplete',
  'oitozero.ngSweetAlert',
  'ngImgCrop',
  'ngFileUpload',
])

.config(function ($stateProvider, $urlRouterProvider, $locationProvider) {
  $urlRouterProvider
    .otherwise('/');

  $locationProvider.html5Mode(true);
  
})

.run(function($rootScope, UserService, $state){


  $rootScope.$on('$stateChangeStart', function (event, next) {
    if( next.data.isPrivate )
      UserService.Auth().then(function(res){
        // User is authenticated
        UserService.Me(res.data);
      }, function(){
        // User is not authenticated
        $state.go('main');
      });
  });

  UserService.Auth().then(function(res){
    // User is authenticated
    UserService.Me(res.data);
    $rootScope.User = UserService.me;
  }, function(){
    $rootScope.User = null;
  });
  
});