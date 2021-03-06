'use strict';

angular.module('quizPortalApp')
  .controller('NavbarLoggedCtrl', function($scope, UserService, $state, $rootScope){
      $('.dropdown-button').dropdown({
        inDuration: 300,
        outDuration: 225,
        constrain_width: false, // Does not change width of dropdown to that of the activator
        hover: false, // Activate on hover
        gutter: 0, // Spacing from edge
        belowOrigin: false // Displays dropdown below the button
      }
    );
      
    if( UserService.me ) 
      $scope.name = UserService.me.name;
    
    $scope.logout = function() {
      UserService.Logout().then(function(){
        $rootScope.User = null;
        $state.go('main');

      })
    }
  });