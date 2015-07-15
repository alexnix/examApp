'use strict';

angular.module('quizPortalApp')
  .controller('ProfileCtrl', function ($scope, UserService, ngDialog) {
    $scope.page_title = "Dashboard";

    $scope.total_marks = 0; $scope.total_questions = 0;
    $scope.categories = new Array();
        

    if(!UserService.me)
        UserService.Auth().then(function(res){
        // User is authenticated
        UserService.Me(res.data);
        $rootScope.User = UserService.me;
      }, function(){
        $rootScope.User = null;
      });

    $scope.user = UserService.me;
    


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

    $scope.openCropDialog = function() {
        ngDialog.open({
            template: "crop_template.html",
            controller: ['$scope', '$http', 'Upload', function($scope, $http, Upload){
                $scope.myImage='';
                $scope.myCroppedImage='';

                $scope.flag = true;
                $scope.handleFileSelect=function(evt) {
                    $scope.flag = false;

                    var file=evt.currentTarget.files[0];
                    var reader = new FileReader();
                    reader.onload = function (evt) {
                      $scope.$apply(function($scope){
                        $scope.myImage=evt.target.result;
                      });
                    };
                    reader.readAsDataURL(file);
                };

                $scope.upload = function() {
                    //upload($scope.myCroppedImage, '/api/uploads/profile');
                    console.log($scope.myImage);
                    var imageDataArray = $scope.myCroppedImage.split(',');

                    var binary = atob(imageDataArray[1]);
                    var array = new Uint8Array(binary.length)
                    for( var i = 0; i < binary.length; i++ ) { 
                        array[i] = binary.charCodeAt(i) 
                    }
                    var image = new Blob([array],{type:'image/png'});
                    // var fd  = new FormData();
                    // fd.append('file', $scope.myCroppedImage);
                    // $http.post('/api/uploads/profile', fd, {
                    //     transformRequest: angular.identity,
                    //     headers: {'Content-Type': 'undefined'}
                    // });


                    Upload.upload({
                        url: '/api/uploads/profile',
                        file: image,
                    }).progress(function (evt) {
                        var progressPercentage = parseInt(100.0 * evt.loaded / evt.total);
                        console.log('progress: ' + progressPercentage + '% ' + evt.config.file.name);
                    }).success(function (data, status, headers, config) {
                        console.log('file ' + config.file.name + 'uploaded. Response: ' + data);
                        $(".profile-pic img").attr("src", $(".profile-pic img").attr("src")+new Date().getTime());
                        $scope.closeThisDialog();
                        Materialize.toast('Profiel picture changed !', 4000);
                    }).error(function (data, status, headers, config) {
                        console.log('error status: ' + status);
                    })
                }

                //$('#fileInput').on('change', handleFileSelect);
                //angular.element(document.querySelector('#fileInput')).on('change',handleFileSelect);
            }],
        });
    };

    $scope.avatar ="http://halfnine.com.au/wp-content/uploads/2013/05/Brad_portrait1-540x540.jpg";

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
