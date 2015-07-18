'use strict';

angular.module('quizPortalApp')
  .controller('ExamCtrl', function ($scope, Timer, $http, $stateParams, ngDialog, SweetAlert, $state, $rootScope) {
   
  // App Logic

  $http.get('/api/exam/get/'+$stateParams.id).then(function(res){
  	$scope.exam = res.data;

   	Timer.Init($scope.exam.duration, function(){
  		$scope.timeUp = true;
			$scope.submitExam();
		});
    $rootScope.timeUp = false;

    $rootScope.theTimer = Timer;

    $scope.ticker = Timer.Ticker();
		Timer.Start();

    $scope.question = $scope.exam.questions[0];
    $scope.question.seen = true;
  	$scope.page_title = $scope.exam.name;
  });

  $scope.$on('$stateChangeStart', function(event, toState, toParams, fromState, fromParams){ 
		if( !$scope.timeUp === true ){
		    if( !confirm("Are you sure you want to leave exam ?") )
		    	event.preventDefault();

//         event.preventDefault();
//       //   SweetAlert.swal({
//       //    title: "Are you sure?",
//       //    text: "",
//       //    type: "warning",
//       //    showCancelButton: true,
//       //    confirmButtonColor: "#DD6B55",
//       //    confirmButtonText: "",
//       //    closeOnConfirm: false,
//       //    closeOnCancel: false
//       //  }, 
//       // function(confirm){ 
//       //    if( confirm )
//       // });



// SweetAlert.swal({
//    title: "Are you sure?",
//    text: "You are about to leave the exam.",
//    type: "warning",
//    showCancelButton: true,
//    confirmButtonColor: "#DD6B55",confirmButtonText: "Yes, I give up",
//    cancelButtonText: "Cancel",
//    closeOnConfirm: false,
//    closeOnCancel: false }, 
// function(isConfirm){ 
//   alert(1);
//    if (isConfirm) 
//     $state.go(toState);
    
// });

      }

	});


	$scope.$on("$destroy", function(){
		Timer.Cancel();
	});

  $scope.submitExam = function(){
    if( !$scope.timeUp === true )
      if( ! confirm('Are you sure you want to finish exam ahead of time ?') )
        return false;
   


    ngDialog.open({
        template: "submit_template.html",
        data: {
          exam: $scope.exam,
        },
        controller: ['$scope', '$http', '$rootScope', function($scope, $http, $rootScope){
          $rootScope.theTimer.Cancel();
          $scope.share = function(){
            FB.ui(
              {
                method: 'share',
                href: 'http://testbharat.com/',
              },
              // callback
              function(response) {
                if ((response && !response.error_code)) {
                  //alert('Posting completed.');

                   $http.post('/api/exam/submit', $scope.ngDialogData.exam).then(function(res){
                    
                    $rootScope.timeUp = true;
                    console.log(res.data);
                    $scope.score = res.data.score;
                    $rootScope.results = results = res.data.results;
                    console.log(res.data);
                  });
                   window.open(location.protocol + '//' + location.host + "/dashboard", '_blank');
                  //$http.post("");
                  $rootScope.User.hasShared = true;
                } else {
                  //alert('Error while posting.');
                }
              }
            );
          };
        }],
      });

  };

  // UI Logic
  $scope.moveTo = function(q) {
  	$scope.question = q;
  	q.seen = true;
  };

  $scope.isLastQuestion = function() {
    if( $scope.exam )
  	 return $scope.exam.questions.indexOf($scope.question) == $scope.exam.questions.length-1;
  };

  $scope.isFirstQuestion = function() {
    if( $scope.exam )
    	return $scope.exam.questions.indexOf($scope.question) == 0;
  };

  $scope.next = function () {
  	var index = $scope.exam.questions.indexOf($scope.question);
  	$scope.question = $scope.exam.questions[index + 1];
  	$scope.question.seen = true;
  };

  $scope.previous = function () {
  	var index = $scope.exam.questions.indexOf($scope.question);
  	$scope.question = $scope.exam.questions[index - 1];
  	$scope.question.seen = true;
  };

  $scope.questionNo = function () {
    if( $scope.exam )
      return $scope.exam.questions.indexOf($scope.question) + 1;
  };

  $scope.isInactive = function(index){
  	if( index ==  $scope.questionNo() - 1 ) 
  		return true;
  	else
  		return false;
  };

  $scope.touched = function(q){
    if( q.ans )
      return true;

  	var flag = false;
  	q.options.forEach(function(option){
  		if( option.value == true )
  			flag = true;
  	});
  	return flag;
  };

  var results = null;
  $scope.isCorrect = function(index) {
    if(results)
      return results[index] === true;
  }

});
