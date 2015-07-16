'use strict';

angular.module('quizPortalApp')
  .controller('ProfileViewCtrl', function ($scope, $stateParams, UserService) {
    $scope.id = $stateParams.id;

    UserService.GetUser($stateParams.id).then(function(result){
    	$scope.user = result.data;
    	$scope.page_title = result.data.name + '`s public profile on Test Bharat ';
    	$scope.total_marks = 0; $scope.total_questions = 0;
	    $scope.categories = new Array();
	    
	    $scope.user.exams.forEach(function(exam){
	    	$scope.total_marks += exam.score;
	    	$scope.total_questions += exam.questions || 0;

	    	var found = false;
	    	$scope.categories.forEach(function(category, index, array){
	    		if( category.name == exam.category ) {
	    			found = true;
	    			array[index].marks += exam.score;
	    			array[index].total += exam.total;
	    			array[index].questions += exam.questions; 
	    		}
	    	});

	    	if( !found ) {
				$scope.categories.push({
					name: exam.category,
					marks: exam.score,
					total: exam.total,
					questions: exam.questions,
				});
			}


	    });
    });
  });
