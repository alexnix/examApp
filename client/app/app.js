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
    if( next.data.isPrivate ){
      //alert(1);
      UserService.Auth().then(function(res){
        // User is authenticated
        UserService.Me(res.data);
      }, function(){
        // User is not authenticated
        $state.go('main');
      });
    }
  });

  UserService.Auth().then(function(res){
    // User is authenticated
    UserService.Me(res.data);
    $rootScope.User = UserService.me;
  }, function(){
    $rootScope.User = null;
  });
  
});


var theLoginModal = {
  template:'login_template.html',
  controller:['$scope', 'UserService', function($scope, UserService){
    $(document).ready(function(){
      $('ul.tabs').tabs();
    });

    $scope.register = {};
    $scope.doRegister = function() {
      UserService.Register($scope.register).then(function(data){
        UserService.LoginLocal($scope.register).then(function(res){
          $scope.closeThisDialog();
          //$state.go("dashboard");
          window.location.reload();
        });
      }, function(){
        alert("Registration failed. Please try again.");
      });
    };

    $scope.login = {};
    $scope.doLogin = function() {
      UserService.LoginLocal($scope.login).then(function(res){
        $scope.closeThisDialog();
        //$state.go("dashboard");
        window.location.reload();
      }, function(){
        alert('Login failed. Please try again.');
      });
    };


    $scope.f = function(){
        window.location.replace('/api/auth/facebook');
    };

    $scope.t = function(){
        window.location.replace('/api/auth/twitter');
    };

    // $scope.g = function(){
    //     window.location.replace('/api/auth/google');
    // };
  }],
};