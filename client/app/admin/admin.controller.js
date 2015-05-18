'use strict';

angular.module('quizPortalApp')
  .controller('AdminCtrl', function ($scope, $http) {

  	$scope.toggle = function($event){
  		var $target = $($event.target);
  		var $content = $target.parents(".one-question").find(".one-question-content");

  		if( $content.is(":visible") ){
  			$content.slideUp();
  			$target.removeClass("fa fa-minus").addClass("fa fa-plus");
  		} else {
  			$content.slideDown();
  			$target.removeClass("fa fa-plus").addClass("fa fa-minus");
  		}
  	};

  	$scope.newExam = function(){
  		if( $scope.exam != null )
  			return false;
    	$scope.exam = {
	    	name:"",
	    	description: "",
	    	tags:[],
	    	duration: 0,
	    	questions: [{
	    		text:'',
	    		options: [{
	    			checked: false,
	    			isCorrect: false,
	    			text: '',
	    		}]
	    	}]
	    };
	    $scope.isNewExam = true;
	    $("section.edit-panel").slideDown();
    };

    $scope.getExam = function(id) {
    	if( $scope.exam == null )
	    	$http.get('/api/admin/exam/'+id).then(function(res){
	    		$scope.exam = res.data;
	    		$("section.edit-panel").slideDown();
	    	});
    }

    $scope.addQuestion = function() {
    	$scope.exam.questions.push({
    		text:'',
    		options: [
    			{
    				checked: false,
    				isCorrect: false,
    				text: '',
    			}
    		]
    	});
    };

    $scope.addOption = function(question) {
    	question.options.push({
    		checked: false,
    		isCorrect: false,
    		text: '',
    	});
    };

    $scope.removeQuestion = function(index) {
    	if( confirm("Are you sure you want to remove question ?") )
    		$scope.exam.questions.splice(index, 1);
    };

    $scope.removeOption = function(question, index){
    	question.options.splice(index, 1);
    };

    $scope.save = function() {
    	$http.post('/api/admin/exam', $scope.exam).then(function(){
    		$("section.edit-panel").slideUp();
    		$scope.exam = null;	
    		$scope.isNewExam = null;
    		loadExams();
    	});
    };

    $scope.update = function() {
    	$http.put('/api/admin/exam/'+$scope.exam._id, $scope.exam).then(function(){
    		$("section.edit-panel").slideUp();
    		$scope.exam = null;	
    		$scope.isNewExam = null;
    		loadExams();
    	});
    };

    $scope.delete = function() {
    	$http.delete('/api/admin/exam/'+$scope.exam._id).then(function(){
    		$("section.edit-panel").slideUp();
    		$scope.exam = null;	
    		$scope.isNewExam = null;
    		loadExams();
    	});
    };

    $scope.cancel = function() {
    	if( confirm("Are you sure you want to cancel ?") ){
    		$("section.edit-panel").slideUp();
    		$scope.exam = null;	
    		$scope.isNewExam = null;
    	}
    }

    function loadExams() {
    	$http.get('/api/exam').then(function(res){
	    	$scope.tests = res.data;
	    });
    };
    loadExams();

  });
