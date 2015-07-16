'use strict';

angular.module('quizPortalApp')
  .controller('NavbarCtrl', function ($scope, $location, UserService, $rootScope, ngDialog) {
    $scope.menu = [{
      'title': 'Home',
      'link': '/'
    },{
      'title': 'All Tests',
      'link': '/all'
    },
    // {
    //   'title': 'Discussions',
    //   'link': '/discussion'
    // },
    // {
    //   'title': 'Blog',
    //   'link': '/blog'
    // },
    ];

    $scope.isCollapsed = true;

    $scope.logout = function() {
      UserService.Logout().then(function(){
        $rootScope.User = null;
        window.location.reload();

      })
    };
    
    $scope.showLogin = function() {
      ngDialog.open(theLoginModal);
    };

    $scope.isActive = function(route) {
      return route === $location.path();
    };
    $scope.foo = "Bar";

    $(document).ready(function(){
      $('.modal-trigger').leanModal();
    });
    
  });

  angular.module('quizPortalApp')
  .controller('ModalCtrl', function ($scope, $location, UserService, $state) {
  
    $scope.foo = "Bar";
    


  });