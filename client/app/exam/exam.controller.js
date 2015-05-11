'use strict';

angular.module('quizPortalApp')
  .controller('ExamCtrl', function ($scope, Timer) {
  	
  	$scope.exam = {
    	id: '4gVh7Q80r', 
    	test_duration: 120000,
    	name: 'Demo Exam',
    	questions:[{
    		text: "Select the frontend technologies.", 
    		options:[{
    			value: false, text :"CSS"}, {
    			value: false, text :"Sockets"}, {
    			value: false, text :"HTML"}, {
    			value: false, text :"MySQL Connectors"}]
    	}, {text: "Question 2", 
    		options:[{
    			value: false, text :"Option 0"}, {
    			value: false, text :"Option 1"}, {
    			value: false, text :"Option 2"}, {
    			value: false, text :"Option 3"}]
    	}, {
    		text: "What does the following image represent? <img src='http://i.stack.imgur.com/88cpr.jpg'/>",
    		options: [{
    			value: false, text :"A tree"}, {
    			value: false, text :"A simple chained list"}, {
    			value: false, text :"The Android Lifecycle"}, {
    			value: false, text :"No ideea"}],
    	}],
    };

  	$scope.$on('$stateChangeStart', 
	function(event, toState, toParams, fromState, fromParams){ 
		if( !$scope.timeUp === true )
		    if( !confirm("Are you sure you want to leave exam ?") )
		    	event.preventDefault();
	    
	});

  	$scope.$on("$destroy", function(){
  		Timer.Stop();
  	});



  	Timer.Init($scope.exam.test_duration/1000, function(){
  		$scope.timeUp = true;
		alert("Time Up");
	});

	Timer.Start();

    $scope.question = $scope.exam.questions[0];
  	$scope.page_title = $scope.exam.name;

  	$scope.submitExam = function(){
  		alert(1);
  	}

    $scope.moveTo = function(q) {
    	$scope.question = q;
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
    };

    $scope.previous = function () {
    	var index = $scope.exam.questions.indexOf($scope.question);
    	$scope.question = $scope.exam.questions[index - 1];
    };

    $scope.questionNo = function () {
    	return $scope.exam.questions.indexOf($scope.question) + 1;
    };

    $scope.isInactive = function(index){
    	if( index ==  $scope.questionNo() - 1 ) 
    		return "inactive grey lighten-1";
    	else
    		return "active waves waves-effect grey lighten-2";
    }
  });
