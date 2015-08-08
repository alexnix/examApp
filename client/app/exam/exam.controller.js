'use strict';

angular.module('quizPortalApp')
  .controller('ExamCtrl', function ($scope, Timer, $http, $stateParams, ngDialog, SweetAlert, $state, $rootScope) {
   
  // App Logic
  var accept_terms, autosaver;
  $http.get('/api/exam/get/'+$stateParams.id).then(function(res){
  	$scope.exam = res.data;

    Timer.Init($scope.exam.duration, function(){
      $scope.timeUp = true;
      $scope.submitExam();
    });
    $rootScope.timeUp = false;
    $rootScope.theTimer = Timer;
    $scope.ticker = Timer.Ticker();
    $scope.question = $scope.exam.questions[0];
    $scope.question.seen = true;
    $scope.page_title = $scope.exam.name;

    accept_terms = ngDialog.open({
      template: 'instructions_dialog.html',
      data: {
        exam: $scope.exam,
      },
      closeByEscape: false,
      closeByDocument: false,
      showClose: false,
      controller: ['$scope', '$rootScope', 'Timer', function($scope, $rootScope, Timer){
        $scope.start = function() {
          $scope.closeThisDialog();
        };
      }],
    });

    accept_terms.closePromise.then(function(){
      Timer.Start();
      autosaver = setInterval(function(){
        $http.post('/api/exam/session', {exam: $scope.exam, duration: $rootScope.theTimer.getSeconds()});
      }, 1000);
    });

  });

  $scope.$on('$stateChangeStart', function(event, toState, toParams, fromState, fromParams){
		accept_terms.close();
	});



	$scope.$on("$destroy", function(){
    clearInterval(autosaver);
		Timer.Cancel();
	});

  $scope.clearAns = function(q) {
    q.ans = null;
    q.options.forEach(function(o){
      o.value = false;
    });
  };

  $scope.attemptedQ = function(){
    var cont = 0;
    $scope.exam.questions.forEach(function(q){
      if ( $scope.touched(q) )
        cont ++;
    });
    return cont;
  };

  function popit2(url) {
    var newwindow=window.open(url,'name','height=500,width=500');
    if (window.focus) {newwindow.resizeTo(1600, 1600); newwindow.focus();}
    return false;
  };

  $scope.submitExam = function(){
    if( !$scope.timeUp === true )
      if( ! confirm('Are you sure you want to finish exam ahead of time ?') )
        return false;
   
    popit2(location.protocol + '//' + location.host + '/summary/'+$rootScope.User._id+'/'+$scope.exam._id); 
    $scope.timeUp = true;
    $http.post('/api/exam/submit', $scope.exam).then(function(res){
      $rootScope.showCorrect = true;
      console.log(res.data);
      $scope.score = res.data.score;
      $rootScope.results = results = res.data.results;
      $scope.leResults = res.data
      console.log(res.data);

      $scope.contor = 0;
      $rootScope.results.forEach(function(result){
        if( result === true )
          $scope.contor ++;
      }); 

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
