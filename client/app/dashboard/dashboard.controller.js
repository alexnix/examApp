'use strict';

angular.module('quizPortalApp')
  .controller('DashboardCtrl', function ($scope) {
  	$scope.page_title = "Dashboard";
     $scope.tests = [
    	{
    		id: '312hg7',	
    		name: "Bussiness 1",
    		description: "Tests basic bussiniess process understanding.",
    		tags: ["bussiness", "plannint", "tradeing"],
    	},

    	{
    		id: '312hg7',
    		name: "Bussiness 2",
    		description: "Achives intermediate understanding of the business process.",
    		tags: ["sellint", "competitors", "business"],
    	},

    	{
    		id: '312hg7',
    		name: "Bussiness 3",
    		description: "Proves advanced undersanding of concepts involved in bussiness and negociation.",
    		tags: ["offerts", "sales", "bussiness"],
    	},
    	{
    		id: '312hg7',
    		name: "Negostiaiton 1",
    		description: "Alows basic negotiation practices.",
    		tags: ["negotiation", "argumentation", "speaking"],
    	},
    	{
    		id: '312hg7',
    		name: "Negostiaiton Advanced",
    		description: "Negotiation advanced skills.",
    		tags: ["negotiation", "speaking", "advanced"],
    	},
    	{
    		id: '312hg7',
    		name: "Ruby",
    		description: "Ruby language concepts.",
    		tags: ["ruby", "gems", "pipes", "back end"],
    	},
    	{
    		id: '312hg7',
    		name: "Ruby on Rails",
    		description: "Understanding og routing and API scaffolding.",
    		tags: ["rails", "mvc", "ruby", "back end"],
    	},
    	{
    		id: '312hg7',
    		name: "Node.js",
    		description: "This test reqquires to know asyncronius tasks and working with npm.",
    		tags: ["node", "v8", "javascript", "back end"],
    	},
    	{
    		id: '312hg7',
    		name: "HTML",
    		description: "HTML basic tags, doctypes and HTML5 DOOM structure.",
    		tags: ["html", "markup", "website", 'front end'],
    	},
    	{
    		id: '312hg7',
    		name: "CSS",
    		description: "Adcanced selectors and moast used properties.",
    		tags: ["website", "css", "style", 'front end'],
    	},
    	{
    		id: '312hg7',
    		name: "CSS Adcanced",
    		description: "CSS frameworks like Bootstrap and Materializecss.",
    		tags: ["website", "css", "style", 'front end'],
    	},
  
    ];

    $scope.menu = [
    	{
    		name: "Business",
    		tag: "Business",
    	},
    	{
    		name: "Website",
    		tag: "Website",
    	},
    	{
    		name: "Back End",
    		tag: "Back End",
    	},
    	{
    		name: "Front End",
    		tag: "Front End",
    	},
    	{
    		name: "HTML",
    		tag: "Back End",
    	},
    	{
    		name: "CSS",
    		tag: "css",
    	},
    ];

    $(document).ready(function(){
	  $('.tooltipped').tooltip({delay: 50});
	});

	$scope.addTag = function(tag) {
		if( $scope.tags.indexOf(tag) == -1 )
			$scope.tags.push(tag);
	};

	$scope.tags = [];
    $scope.matchesTags = function(exam_tags) {
    	if( $scope.tags == undefined || $scope.tags.length == 0){
    		return true;
    	}
    	else{	
    		var flag = true;
    		$scope.tags.forEach(function(tag){
    			if( exam_tags.indexOf(tag.toLowerCase()) == -1 )
    				flag = false;
    		});
    		return flag;
    	}
    }
  });
