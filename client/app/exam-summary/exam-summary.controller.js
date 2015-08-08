'use strict';

angular.module('quizPortalApp')
  .controller('ExamSummaryCtrl', function ($scope, $http, $stateParams) {
  	$scope.page_title = "Exam Summary";
  	$scope.attender_id = $stateParams.user;
    $http.get('/api/exam/summary/'+$stateParams.user+'/'+$stateParams.exam).then(function(res){
    	$scope.exam = res.data;
    	$scope.corect = 0;
    	$scope.exam.results.forEach(function(result){
    		if(result === true)
    			$scope.corect ++;
    	})
    });

    $scope.g = function() {
    var shareUrl = location.protocol + '//' + location.host;
    popit('https://plus.google.com/share?url='+shareUrl);
  };

  $scope.f = function() {
    var shareUrl = location.protocol + '//' + location.host;
    popit('https://www.facebook.com/sharer/sharer.php?u='+shareUrl);
  };

  $scope.l = function() {
    var shareUrl = location.protocol + '//' + location.host;
    popit('https://www.linkedin.com/shareArticle?mini=true&url='+shareUrl);
  };

  function popit(url) {
    var newwindow=window.open(url,'name','height=500,width=500');
    if (window.focus) {newwindow.focus()}
    return false;
  };



  });
