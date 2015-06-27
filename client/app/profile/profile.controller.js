'use strict';

angular.module('quizPortalApp')
  .controller('ProfileCtrl', function ($scope, UserService) {
    $scope.page_title = "Edit Profile";

    $scope.user = UserService.me;
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

    $scope.save = function() {
    	UserService.UpdateProfile({
    		age: $scope.user.age,
    		tagline: $scope.user.tagline,
    	}).then(function(){
            Materialize.toast('Updated !', 4000);
    	});
    }

 	// $scope.stringToColour = function(str) {
	//     // str to hash
	//     for (var i = 0, hash = 0; i < str.length; hash = str.charCodeAt(i++) + ((hash << 5) - hash));
	//     // int/hash to hex
	//     for (var i = 0, colour = "#"; i < 3; colour += ("00" + ((hash >> i++ * 8) & 0xFF).toString(16)).slice(-2));
	//     return colour;
	// };

    // $scope.getOptions = function(exam){
    // 	return {
    // 		readOnly: true,
    // 		max: exam.t
    // 	}
    // }

  });
