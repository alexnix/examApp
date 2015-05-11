'use strict';

angular.module('quizPortalApp')
  .controller('MainCtrl', function ($scope, $http) {
    $scope.awesomeThings = [];

    $http.get('/api/things').success(function(awesomeThings) {
      $scope.awesomeThings = awesomeThings;
    });

   $scope.tests = [
    	{
    		name: "Bussiness 1",
    		description: "Tests basic bussiniess process understanding.",
    	},

    	{
    		name: "Bussiness 2",
    		description: "Achives intermediate understanding of the business process.",
    	},

    	{
    		name: "Bussiness 3",
    		description: "Proves advanced undersanding of concepts involved in bussiness and negociation.",
    	},
    	
    	{
    		name: "Ruby",
    		description: "Ruby language concepts.",
    	},
    	{
    		name: "Ruby on Rails",
    		description: "Understanding og routing and API scaffolding.",
    	},
    	{
    		name: "Node.js",
    		description: "This test reqquires to know asyncronius tasks and working with npm.",
    	},
    	
  
    ];	

    $scope.tests2 = [{
    		name: "Negostiaiton 1",
    		description: "Alows basic negotiation practices.",
    	},
    	{
    		name: "Negostiaiton Advanced",
    		description: "Negotiation advanced skills.",
    	},];

    $scope.tests3 = [{
    		name: "HTML",
    		description: "HTML basic tags, doctypes and HTML5 DOOM structure.",
    	},
    	{
    		name: "CSS",
    		description: "Adcanced selectors and moast used properties.",
    	},
    	{
    		name: "CSS Adcanced",
    		description: "CSS frameworks like Bootstrap and Materializecss.",
    	},];

  });
