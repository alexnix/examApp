'use strict';

angular.module('quizPortalApp')
  .controller('DashboardCtrl', function ($scope, $http) {
  	$scope.page_title = "Dashboard";

    function loadExams() {
    	$http.get('/api/exam').then(function(res){
	    	$scope.tests = res.data;
	    });
    };
    loadExams();

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
    };

  });
