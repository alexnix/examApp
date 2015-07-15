'use strict';

angular.module('quizPortalApp')
  .controller('AllCtrl', function ($scope, $http) {
    $scope.page_title = "All Exams";

	// $('.modal-trigger').leanModal();
	// $('#modal1').openModal();

    $scope.categories = [];
    function loadExams() {
    	$http.get('/api/exam').then(function(res){
	    	$scope.tests = res.data;
	    	res.data.forEach(function(test){
                if ( $scope.categories.indexOf(test.category) == -1 && test.category )
                    $scope.categories.push(test.category);
                //console.log(test);
            });
            $scope.filterinCateg = null;
	    });
    };
    loadExams();

    $(document).ready(function(){
	  $('.tooltipped').tooltip({delay: 50});
	});

	$scope.addTag = function(tag) {
		// if( $scope.tags.indexOf(tag) == -1 )
		// 	$scope.tags.push(tag);
		$scope.filterinCateg = tag;
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

