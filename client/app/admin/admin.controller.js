'use strict';

angular.module('quizPortalApp')
  .controller('AdminCtrl', function ($scope, $http) {

    $scope.page_title = "Admin"
    $scope.categories = ["Web", "Business", "Management", "Mathmatics"];
    
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
	    	//description: "",
	    	tags:[],
	    	duration: 10,
            category: null,
            atendees: 0,
	    	questions: [{
	    		text:'',
                id: generateUUID(),
                marks: 1,
                marks_negative: 0,
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
                $scope.exam.duration = $scope.exam.duration/60;
	    		$("section.edit-panel").slideDown();
	    	});
    }

    $scope.addQuestion = function() {
    	$scope.exam.questions.push({
    		text:'',
            marks: 1,
            marks_negative: 0,
            id: generateUUID(),
    		options: [
    			{
    				checked: false,
    				isCorrect: false,
    				text: '',
    			}
    		]
    	});
    };

    function generateUUID() {
        var d = new Date().getTime();
        var uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
            var r = (d + Math.random()*16)%16 | 0;
            d = Math.floor(d/16);
            return (c=='x' ? r : (r&0x3|0x8)).toString(16);
        });
        return uuid;
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
        var marks = 0;
        $scope.exam.questions.forEach(function(question){
            marks += question.marks;
        });
        $scope.exam.marks = marks;
        $scope.exam.duration *= 60;
    	$http.post('/api/admin/exam', $scope.exam).then(function(){
    		$("section.edit-panel").slideUp();
    		$scope.exam = null;	
    		$scope.isNewExam = null;
    		loadExams();
    	});
    };

    $scope.update = function() {
        var marks = 0;
        $scope.exam.questions.forEach(function(question){
            marks += question.marks;
        });
        $scope.exam.marks = marks;
        $scope.exam.duration *= 60;
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
            res.data.forEach(function(test){
                if ( $scope.categories.indexOf(test.category) )
                    $scope.categories.push(test.category);
                //console.log(test);
            });
	    });
    };
    loadExams();

  });
