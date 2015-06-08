'use strict';

angular.module('quizPortalApp')
  .controller('NavbarCtrl', function ($scope, $location) {
    $scope.menu = [{
      'title': 'Home',
      'link': '/'
    },{
      'title': 'Discussions',
      'link': '/discussions'
    },{
      'title': 'Blog',
      'link': '/blog'
    },];

    $scope.isCollapsed = true;

    $scope.isActive = function(route) {
      return route === $location.path();
    };
    $scope.foo = "Bar";
    $scope.doRegister = function() {
      alert("Registering...");
    };

    $scope.doLogin = function() {
      alert("Logging ing...");
    };
    $(document).ready(function(){
      $('ul.tabs').tabs();
      $('.modal-trigger').leanModal();
    });
    
  });

  angular.module('quizPortalApp')
  .controller('ModalCtrl', function ($scope, $location, UserService) {
  
    $scope.foo = "Bar";
    $scope.doRegister = function() {
      UserService.Register($scope.register).then(function(data){
        alert(11);
      }, function(){
        alert(0);
      });
    };

    $scope.doLogin = function() {
      UserService.LoginLocal($scope.login).then(function(res){
        alert("Success");
        console.log(res.data);
      }, function(){
        alert('Fail boss');
      });
    };


    $scope.f = function(){
        window.location.replace('/api/auth/facebook');
    };

    $scope.t = function(){
        window.location.replace('/api/auth/twitter');
    };

    $scope.g = function(){
        window.location.replace('/api/auth/google');
    };

  });