'use strict';

angular.module('quizPortalApp')
  .controller('ExamCtrl', function ($scope, Timer, $http, $stateParams, ngDialog) {
   
  // App Logic

  $http.get('/api/exam/get/'+$stateParams.id).then(function(res){
  	$scope.exam = res.data;

   	Timer.Init($scope.exam.duration, function(){
  		$scope.timeUp = true;
			alert("Time Up");
		});

    $scope.ticker = Timer.Ticker();
		Timer.Start();

    $scope.question = $scope.exam.questions[0];
    $scope.question.seen = true;
  	$scope.page_title = $scope.exam.name;
  });

  $scope.$on('$stateChangeStart', function(event, toState, toParams, fromState, fromParams){ 
		if( !$scope.timeUp === true )
		    if( !confirm("Are you sure you want to leave exam ?") )
		    	event.preventDefault();
	});

	$scope.$on("$destroy", function(){
		Timer.Cancel();
	});

  $scope.submitExam = function(){
    if( !$scope.timeUp === true )
      if( ! confirm('Are you sure you want to finish exam ahead of time ?') )
        return false;
    $http.post('/api/exam/submit', $scope.exam).then(function(res){
      Timer.Cancel();
      $scope.timeUp = true;
      console.log(res.data);
      ngDialog.open({
        template: "<h4>Exam Checked</h4><p>Your score is <b>"+res.data.score+"</b></p>",
        plain: true,
      });
      results = res.data.results;
    });
  };

  // UI Logic
  $scope.moveTo = function(q) {
  	$scope.question = q;
  	q.seen = true;
  };

  $scope.isLastQuestion = function() {
  	return $scope.exam.questions.indexOf($scope.question) == $scope.exam.questions.length-1;
  };

  $scope.isFirstQuestion = function() {
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
      return results[index];
  }

});
