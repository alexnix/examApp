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

    $(document).ready(function(){
      $('ul.tabs').tabs();
      $('.modal-trigger').leanModal();
    });
    
  });